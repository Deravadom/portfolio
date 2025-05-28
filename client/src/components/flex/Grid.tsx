import { HTMLAttributes, PropsWithChildren } from "react"

type Props = Pick<HTMLAttributes<HTMLDivElement>, "className" | "onClick">
const Grid = ({ className, onClick, children }: PropsWithChildren<Props>) => (
  <div className={`grid ${className}`} onClick={onClick}>
    {children}
  </div>
)

export default Grid