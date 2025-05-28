import Row from "../flex/Row"

type Props = {
  label?: string
  labelClass?: string
  containerClass?: string
  lineClass?: string
}
const HorizontalRule = ({
  label,
  labelClass = "",
  containerClass = "",
  lineClass = ""
}: Props) => (
  <Row className={`w-full h-px items-center ${containerClass}`}>
    <div
      className={`flex h-px bg-secondary ${label ? "w-1/2" : "w-full"} ${lineClass}`}
    />
    {label && (
      <>
        <span className={`text-xs text-secondary ${labelClass}`}>{label}</span>
        <div className={`flex h-px bg-secondary w-1/2 ${lineClass}`} />
      </>
    )}
  </Row>
)

export default HorizontalRule