import { HTMLAttributes, PropsWithChildren } from "react"

type Props = Pick<HTMLAttributes<HTMLDivElement>, "className" | "onClick">

const Row = ({ className = "", onClick, children }: PropsWithChildren<Props>) => (
  <div className={`flex flex-row ${className}`} onClick={onClick}>
    {children}
  </div>
)

export default Row;