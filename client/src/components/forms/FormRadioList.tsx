import { FieldValues, useFormContext } from "react-hook-form";
import { FormInputProps } from "./FormInput";
import Label from "./Label";
import Error from "./Error"

export type FormRadioOption = {
  label?: string
  value: string
}

type FormRadioProps<T extends FieldValues,> = FormRadioOption & Pick<
  FormInputProps<T>,
  "fieldName" | "inputClass" | "containerClass"
>

export const FormRadio = <T extends FieldValues,>({
  label, value, inputClass, containerClass, fieldName
}: FormRadioProps<T>) => {
  const { register } = useFormContext<T>()
  return (
    <label key={value} className={containerClass}>
      <input
        {...register(fieldName)}
        type="radio"
        className={inputClass}
        key={value}
        value={value}
      />
      {label || value}
    </label>
  )
}

type Props<T extends FieldValues,> = FormInputProps<T> & {
  options: FormRadioOption[]
}

const FormRadioList = <T extends FieldValues,>({
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
        <FormRadio
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

export default FormRadioList