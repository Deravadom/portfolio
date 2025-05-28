import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form"
import { FormInputProps } from "./FormInput"
import Label from "./Label"
import Error from "./Error"
import { useEffect, useRef } from "react"

type ImageDisplayProps = {
  value: FileList | string[] | null
  placeholder: string | undefined
}
const ImageDisplay = ({ value, placeholder }: ImageDisplayProps) => {
  if (!value || value.length == 0) {
    return (
      <div className="w-full">
        {placeholder}
      </div>
    )
  }

  if (typeof value[0] == "string") {
    return (
      <>
        {(value as string[]).map(src => (
          <img src={src} key={src} />
        ))}
      </>
    )
  }

  return (
    <>
      {Array.from(value as FileList).map(image => (
        <img src={URL.createObjectURL(image)} key={image.name} />
      ))}
    </>
  )
}

type Props<T extends FieldValues> = FormInputProps<T> & {
  multiple?: boolean
  accept?: string
}

const FormFileInput = <T extends FieldValues>({
  fieldName,
  containerClass,
  label,
  description,
  multiple,
  accept,
  required,
  errorField,
  errorMessage,
  placeholder,
  labelClass,
  descriptionClass,
  errorClass,
  errorSpaceClass,
  inputClass,
}: Props<T>) => {
  const { register, watch, setValue } = useFormContext<T>()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const value = watch(fieldName) as FileList | string[]

  useEffect(() => {
    register(fieldName)
  }, [register, fieldName])

  return (
    <div className={containerClass} onClick={() => fileInputRef.current?.click()}>
      {label && <Label {...{ label, labelClass }} />}
      {description && (
        <span className={descriptionClass}>{description}</span>
      )}
      <div
        className={inputClass}
      >
        <ImageDisplay placeholder={placeholder} value={value} />
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        hidden
        onChange={(e) => {
          setValue(fieldName, e.target.files as PathValue<T, Path<T>>)
        }}
      />
      {required && (
        <Error {...{ errorField, errorClass, errorMessage, errorSpaceClass }} />
      )}
    </div>
  )
}

export default FormFileInput