import { HTMLInputTypeAttribute, InputHTMLAttributes, JSX } from "react"
import { FieldValue, FieldValues, Path, useFormContext, Validate, ValidationRule } from "react-hook-form"
import Error, { ErrorProps } from "./Error"
import Label, { LabelProps } from "./Label"
import { useMinDate } from "../../utils/dateUtils"

export type InputBaseAttr = InputHTMLAttributes<HTMLInputTypeAttribute>

type MaxLengthValue = InputBaseAttr["maxLength"]
type MaxValue = InputBaseAttr["max"]
type MinValue = InputBaseAttr["min"]
const useMin = (min: MinValue, type: HTMLInputTypeAttribute | undefined) => {
  const today = useMinDate()

  if (!type) return undefined
  if (min) return min

  switch (type) {
    case "date": {
      return today
    }
  }
}

export type FormInputProps<T extends FieldValues> =
  LabelProps & ErrorProps & {
    description?: string
    descriptionClass?: string
    containerClass?: string
    fieldName: Path<T>
    inputClass?: string
    inputContainerClass?: string
    required?: boolean
    placeholder?: string
    type?: HTMLInputTypeAttribute
    min?: MinValue
    max?: MaxValue
    maxLength?: MaxLengthValue
    step?: InputBaseAttr["step"]
    validate?: Validate<FieldValue<T>, FieldValues>
    pattern?: ValidationRule<RegExp>
    icon?: JSX.Element
  }

const FormInput = <T extends FieldValues,>({
  containerClass,
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
  validate,
  pattern,
  type,
  min,
  max,
  maxLength,
  step,
  errorSpaceClass,
  icon,
  inputContainerClass
}: FormInputProps<T>) => {
  const valueAsNumber = type === 'number' ? undefined : false
  const minValue = useMin(min, type)

  const { register } = useFormContext<T>()

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} />}
      {description && (
        <span className={descriptionClass}>{description}</span>
      )}
      {icon && (
        <div className={inputContainerClass}>
          {icon}
          <input
            type={type}
            {...register(fieldName, { required, valueAsNumber, validate, pattern })}
            aria-invalid={errorField ? "true" : false}
            aria-placeholder={placeholder}
            className={inputClass}
            min={minValue}
            {...{ placeholder, max, maxLength, step }}
          />
        </div>
      )}
      {!icon && (
        <input
          type={type}
          {...register(fieldName, { required, valueAsNumber, validate, pattern })}
          aria-invalid={errorField ? "true" : false}
          aria-placeholder={placeholder}
          className={inputClass}
          min={minValue}
          {...{ placeholder, max, maxLength }}
        />
      )}
      {required && (
        <Error {...{ errorField, errorClass, errorMessage, errorSpaceClass }} />
      )}
    </div>
  )
}

export default FormInput;