import { FieldValue, FieldValues, Path, PathValue, useFormContext } from "react-hook-form";
import { FormSelectOption, FormSelectProps } from "./FormSelect";
import useToggle from "../../hooks/useToggle";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import Label from "./Label";

type Props<T extends FieldValues,> = FormSelectProps<T> & {
  defaultOpen?: boolean
  iconClass?: string
  placeholderClass?: string
}

const FormSearchableAccordionSelect = <T extends FieldValues,>({
  fieldName,
  label,
  placeholder,
  description,
  options,
  defaultOpen,
  labelClass,
  inputClass,
  descriptionClass,
  containerClass,
  placeholderClass,
  // required,
  // errorField,
  // errorMessage = "Required",
  // errorClass,
  multiple,
  // iconClass
}: Props<T>) => {
  const { register, watch, setValue, resetField } = useFormContext<T>()
  const [open, toggleOpen] = useToggle(defaultOpen)
  const [text, setText] = useState<string>()

  useEffect(() => {
    register(fieldName)
  }, [register, fieldName])

  const value = watch(fieldName)

  const filteredOptions = useMemo(() => {
    if (!text) { return options }
    return options.filter(o => o.label?.toLowerCase()?.includes(text) || o.value?.toLowerCase()?.includes(text))
  }, [text, options])

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value)
  }

  const buildSelectHandler = useCallback(
    (option: FormSelectOption<T>) => multiple ?
      () => setValue(fieldName, [...value || [], option.value] as PathValue<T, Path<T>>) :
      () => setValue(fieldName, option.value),
    [setValue, fieldName, value, multiple]
  )

  const buildDeselectHandler = useCallback(
    (option: FormSelectOption<T>) => multiple ?
      () => setValue(fieldName, (value as FieldValue<T>[]).filter(v => v !== option.value) as PathValue<T, Path<T>>) :
      () => resetField(fieldName),
    [setValue, fieldName, value, multiple, resetField]
  )

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} onClick={toggleOpen} />}
      <div onClick={toggleOpen} className={descriptionClass}>
        <span>{value ? value : description}</span>
        {open && <CaretDownIcon className="h-6 w-6" />}
        {!open && <CaretUpIcon className="h-6 w-6" />}
      </div>
      {open && (
        <input type="text" className={placeholderClass} onChange={handleSearch} placeholder={placeholder} />
      )}
      {open && (
        <ul className={inputClass}>
          {filteredOptions.map(option => {
            const selected = value?.includes(option.value)
            // TODO: Fix typing here instead of clobbering
            const onClick = selected ?
              buildDeselectHandler(option) :
              buildSelectHandler(option)

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

export default FormSearchableAccordionSelect