import { DOMAttributes, PropsWithChildren } from "react"

type Props = Pick<DOMAttributes<HTMLDivElement>, "onClick"> & {
  className?: string
}

const Col = ({ className = "", onClick, children }: PropsWithChildren<Props>) => (
  <div className={`flex flex-col ${className}`} onClick={onClick}>
    {children}
  </div>
)

export default Col;