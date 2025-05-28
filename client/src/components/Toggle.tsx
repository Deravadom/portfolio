import Label from "./forms/Label"

type Props = {
  label?: string
  containerClass?: string
  labelClass?: string
  inputClass?: string
  inputContainerClass?: string
  col?: boolean
  checked?: boolean
  onClick?: VoidFunction
}
const Toggle = ({
  label,
  col = false,
  checked = false,
  onClick,
  containerClass,
  labelClass,
  inputClass,
  inputContainerClass
}: Props) => {
  const rowStyle = col ? 'flex-col' : 'flex-row'

  return (
    <div className={containerClass}>
      {label && <Label {...{ label, labelClass }} />}
      <div className={`${inputContainerClass} ${checked ? `${rowStyle}-reverse` : rowStyle}`} onClick={onClick}>
        <div className={`${inputClass} rounded-full bg-primary`} />
      </div>
    </div>
  )
}

export default Toggle