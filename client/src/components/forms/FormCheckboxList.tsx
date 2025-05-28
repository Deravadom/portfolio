import { FieldValues, useFormContext } from "react-hook-form";
import { FormInputProps } from "./FormInput";
import Label from "./Label";
import Error from "./Error"

export type FormRadioOption = {
  label?: string
  value: string
}

type FormCheckBoxProps<T extends FieldValues,> = FormRadioOption & Pick<
  FormInputProps<T>,
  "fieldName" | "inputClass" | "containerClass"
>

export const FormCheckBox = <T extends FieldValues,>({
  label, value, inputClass, containerClass, fieldName
}: FormCheckBoxProps<T>) => {
  const { register } = useFormContext<T>()
  return (
    <label key={value} className={containerClass}>
      <input
        {...register(fieldName)}
        type="checkbox"
        className={inputClass}
        key={value}
        value={label || value}
      />
      {label || value}
    </label>
  )
}

type Props<T extends FieldValues,> = FormInputProps<T> & {
  options: FormRadioOption[]
}

const FormCheckboxList = <T extends FieldValues,>({
  fieldName,
  label,
  labelClass,
  inputClass,
  inputContainerClass,
  required,
  errorField,
  errorMessage = "Required",
  errorClass,
  options
}: Props<T>) => {
  return (
    <>
      {label && <Label {...{ label, labelClass }} />}
      {options.map(({ value, label: optionLabel }) => (
        <FormCheckBox
          key={value}
          label={optionLabel}
          containerClass={inputContainerClass}
          {...{ value, inputClass, fieldName }}
        />
      ))}
      {required && (
        <Error {...{ errorField, errorClass, errorMessage }} />
      )}
    </>
  )
};

export default FormCheckboxList