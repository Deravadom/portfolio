import { PropsWithChildren } from "react";

export type CardProps = {
  col?: boolean
  onClick?: () => void
  className?: string
  bgColor?: string
}

const Card = ({
  col = false,
  onClick,
  className = '',
  bgColor = 'bg-tertiary',
  children
}: PropsWithChildren<CardProps>) => {
  const containerClass = `
  flex rounded-2xl ${bgColor}
  ${col ? 'flex-col' : 'flex-row'} 
  ${className}
  `;

  return (
    <div
      onClick={onClick}
      className={containerClass}
    >
      {children}
    </div>
  )
}

export default Card;