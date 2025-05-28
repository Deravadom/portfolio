import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { FormInputProps } from "./FormInput";
import Label from "./Label";
import Error from "./Error"

export type FormSelectOption<T extends FieldValues,> = {
  label?: string
  value: PathValue<T, Path<T>>
}

export type FormSelectProps<T extends FieldValues,> = FormInputProps<T> & {
  options: FormSelectOption<T>[]
  multiple?: boolean
}

const FormSelect = <T extends FieldValues,>({
  fieldName,
  label,
  labelClass,
  inputClass,
  description,
  descriptionClass,
  containerClass,
  required,
  placeholder,
  errorField,
  errorMessage = "Required",
  errorClass,
  options,
  multiple
}: FormSelectProps<T>) => {
  const { register } = useFormContext<T>()

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} />}
      {description && (
        <span className={descriptionClass}>{description}</span>
      )}
      <select
        {...register(fieldName, { required })}
        aria-invalid={errorField ? "true" : false}
        aria-placeholder={placeholder}
        className={inputClass}
        multiple={multiple}
      >
        <option style={{ display: "none" }} value="">{placeholder}</option>
        {options.map(({ value, label: optionLabel }) => (
          <option key={value} value={value}>
            {optionLabel || value}
          </option>
        ))}
      </select>
      {required && (
        <Error {...{ errorField, errorClass, errorMessage }} />
      )}
    </div>
  )
}

export default FormSelect