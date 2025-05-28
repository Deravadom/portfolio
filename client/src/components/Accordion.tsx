import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons"
import { JSX, PropsWithChildren } from "react"
import useToggle from "../hooks/useToggle"

type Props = {
  defaultOpen?: boolean
  label: JSX.Element | string
  description?: JSX.Element | string
  containerClass?: string
  labelClass?: string
  iconClass?: string
}
const Accordion = ({
  defaultOpen,
  label,
  description,
  children,
  containerClass,
  labelClass,
  iconClass
}: PropsWithChildren<Props>) => {
  const [open, setOpen] = useToggle(defaultOpen)

  return (
    <div className={containerClass}>
      <div className={labelClass} onClick={setOpen}>
        {label}
        {open && <CaretDownIcon className={iconClass} />}
        {!open && <CaretUpIcon className={iconClass} />}
      </div>
      {description}
      {open && (
        children
      )}
    </div>
  )
}

export default Accordion