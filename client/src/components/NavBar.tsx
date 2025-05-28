export type NavOption = {
  label?: string
  value: string
}

type Props = {
  options: NavOption[]
  selected: string
  onSelect: (option: string) => void
  className?: string
  optionClass?: string
  selectedClass?: string
}

const NavBar = ({
  options,
  selected,
  onSelect,
  className,
  selectedClass,
  optionClass
}: Props) => {
  return (
    <div className={className}>
      {options.map(({ label, value }) => (
        <div
          className={value === selected ? selectedClass : optionClass}
          onClick={() => onSelect(value)}
          key={value}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

export default NavBar