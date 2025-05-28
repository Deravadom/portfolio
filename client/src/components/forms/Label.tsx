export type LabelProps = {
  label?: string
  labelClass?: string
  onClick?: () => void
}

const Label = ({
  label, labelClass, onClick
}: LabelProps) => (
  <label className={labelClass} onClick={onClick}>{label}</label>
)

export default Label