import { FieldValues, useFormContext } from "react-hook-form"
import { FormInputProps } from "./FormInput"
import Label from "./Label"
import { PropsWithChildren, useEffect, useImperativeHandle, useRef } from "react"

type Props = Pick<
  FormInputProps<FieldValues>,
  "fieldName" | "label" | "description" | "min" | "max" |
  "required" | "validate" | "step" |
  "labelClass" | "containerClass" | "descriptionClass" | "inputClass"
> & {
  markers?: boolean
  /**
   * Must be a multiple of step if step is present
   */
  markerValues?: (string | number)[]
}

const FormRangeInput = ({
  fieldName,
  label,
  description,
  min = 0,
  max = 100,
  step,
  markers,
  markerValues,
  required,
  validate,
  children,
  labelClass,
  containerClass,
  descriptionClass,
  inputClass
}: PropsWithChildren<Props>) => {
  const { register, watch } = useFormContext<FieldValues>()
  const { ref, ...rest } = register(fieldName, { required, validate })
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => inputRef.current)

  const parsedMin = parseInt(`${min}`)
  const parsedMax = parseInt(`${max}`)

  const displayMarkers = markerValues || [min, (parsedMax - parsedMin) / 2, max]
  const value = watch(fieldName)

  useEffect(() => {
    if (inputRef.current) {
      const percent = ((value - parsedMin) / (parsedMax - parsedMin)) * 100;
      inputRef.current.style.setProperty('--tw-range-progress', `${percent}%`);
    }
  }, [value, min, max, parsedMin, parsedMax]);

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} />}
      {description && (
        <span className={descriptionClass}>{description}</span>
      )}
      <input
        type="range"
        className={inputClass + ' range-primary'}
        {...rest}
        {...{ min, max, step }}
        list={fieldName + "markers"}
        ref={inputRef}
      />
      {(markers || markerValues) && (
        <datalist id={fieldName + "markers"}>
          {displayMarkers.map(value => (
            <option value={value} key={'marker-' + value} />
          ))}
        </datalist>
      )}
      {children}
    </div>
  )
}

export default FormRangeInput