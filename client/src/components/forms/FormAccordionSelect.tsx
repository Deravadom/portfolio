import { FieldValue, FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { FormSelectOption, FormSelectProps } from "./FormSelect";
import useToggle from "../../hooks/useToggle";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo } from "react";
import Label from "./Label";

type Props<T extends FieldValues,> = FormSelectProps<T> & {
  defaultOpen?: boolean
  iconClass?: string
  multiple?: boolean
}

type IsSelectedFunc = <T extends FieldValues>(
  value: PathValue<T, Path<T>>, optionValue: FormSelectOption<T>["value"]
) => boolean
const isMultiSelected: IsSelectedFunc = (value, optionValue) => (
  value?.includes(optionValue)
)
const isSingleSelected: IsSelectedFunc = (value, optionValue) => (
  value === optionValue
)

const FormAccordionSelect = <T extends FieldValues,>({
  fieldName,
  label,
  labelClass,
  inputClass,
  description,
  descriptionClass,
  containerClass,
  // required,
  // placeholder,
  // errorField,
  // errorMessage = "Required",
  // errorClass,
  options,
  multiple,
  defaultOpen,
  // iconClass
}: Props<T>) => {
  const { register, watch, setValue } = useFormContext<T>()
  const [open, toggleOpen] = useToggle(defaultOpen)

  useEffect(() => {
    register(fieldName)
  }, [register, fieldName])

  const value = watch(fieldName)

  const isSelected = useMemo(() => (
    multiple ? isMultiSelected : isSingleSelected
  ), [multiple])

  const handleSelectFactory = useMemo(() =>
    multiple ?
      (selected: boolean, optionValue: FormSelectOption<T>) =>
        selected ?
          () => setValue(fieldName, (value as FieldValue<T>[]).filter(v => v != optionValue) as PathValue<T, Path<T>>) :
          () => setValue(fieldName, [...value || [], optionValue] as PathValue<T, Path<T>>)
      :
      (selected: boolean, optionValue: FormSelectOption<T>) =>
        selected ?
          () => setValue(fieldName, undefined as PathValue<T, Path<T>>) :
          () => setValue(fieldName, optionValue as PathValue<T, Path<T>>),
    [multiple, fieldName, setValue, value]
  )


  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} onClick={toggleOpen} />}
      <div onClick={toggleOpen} className={descriptionClass}>
        <span>{description}</span>
        {open && <CaretDownIcon className="h-6 w-6" />}
        {!open && <CaretUpIcon className="h-6 w-6" />}
      </div>
      {open && (
        <ul className={inputClass}>
          {options.map(option => {
            const selected = isSelected(value, option.value)
            const onClick = handleSelectFactory(selected, option.value)

            return (
              <li
                className={`${selected && 'bg-secondary'} hover:bg-secondary cursor-pointer`}
                key={option.value}
                onClick={onClick}
              >
                {option.label || option.value}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FormAccordionSelect