import { FieldValues, useFormContext } from "react-hook-form"
import { FormInputProps } from "./FormInput"
import Error from "./Error"
import Label from "./Label"

const TextAreaInput = <T extends FieldValues,>({
  fieldName,
  label,
  labelClass,
  description,
  descriptionClass,
  inputClass,
  required,
  placeholder,
  errorField,
  errorMessage = "Required",
  errorClass,
}: FormInputProps<T>) => {
  const { register } = useFormContext<T>()

  return (
    <>
      {label && <Label {...{ label, labelClass }} />}
      {description && (
        <span className={descriptionClass}>{description}</span>
      )}
      <textarea
        {...register(fieldName, { required })}
        aria-invalid={errorField ? "true" : false}
        placeholder={placeholder}
        aria-placeholder={placeholder}
        className={inputClass}
      />
      {required && (
        <Error {...{ errorField, errorClass, errorMessage }} />
      )}
    </>
  )
}

export default TextAreaInput