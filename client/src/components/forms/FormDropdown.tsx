import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form"
import useToggle from "../../hooks/useToggle"
import { FormInputProps } from "./FormInput"
import Label from "./Label"
import Row from "../flex/Row"
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import { useEffect } from "react"

type FormSelectOption<T extends FieldValues,> = {
  label?: string
  value: PathValue<T, Path<T>>
}

type Props<T extends FieldValues,> = FormInputProps<T> & {
  options: FormSelectOption<T>[]
}
const FormDropdown = <T extends FieldValues,>({
  fieldName,
  label,
  description,
  options,
  labelClass,
  containerClass,
  descriptionClass,
}: Props<T>) => {
  const [open, toggleOpen] = useToggle(false)
  const { register, watch, setValue } = useFormContext<T>()

  useEffect(() => {
    register(fieldName)
  }, [register, fieldName])

  const value = watch(fieldName)

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} onClick={toggleOpen} />}
      <Row onClick={toggleOpen} className={descriptionClass}>
        <span>{description}</span>
        {open && <CaretDownIcon className="h-6 w-6" />}
        {!open && <CaretUpIcon className="h-6 w-6" />}
      </Row>
      {open &&
        <ul className="absolute bg-tertiary z-10 shadow mt-16">
          {options.map((option) => {
            const selected = value?.includes(option.value)
            return (
              <li
                key={option.value}
                className={`${selected && 'bg-secondary'} hover:bg-secondary cursor-pointer`}
                // TODO: Fix typing here instead of clobbering
                onClick={() => setValue(fieldName, [...value || [], option.value] as PathValue<T, Path<T>>)}
              >
                {option.label}
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default FormDropdown