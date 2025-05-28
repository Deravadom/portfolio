import { PropsWithChildren } from "react";

type Props = {
  onClick: () => void
  className?: string
}
const Button = ({ onClick, className = "", children }: PropsWithChildren<Props>) => {
  return (
    <div onClick={onClick} className={`cursor-pointer rounded-2xl bg-primary ${className}`}>
      {children}
    </div>
  )
}

export default Button;