import { JSX } from "react";

type Props = {
  label: string
  icon: JSX.Element
  col?: boolean
  onClick: () => void
  containerClass?: string
}
const HeaderIcon = ({ label, icon, col = false, onClick, containerClass }: Props) => {
  const flexType = col ? 'flex-col' : 'flex-row'
  return (
    <div
      className={`${containerClass} flex ${flexType} items-center cursor-pointer rounded hover:bg-tertiary`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xl">{label}</span>
    </div >
  )
}

export default HeaderIcon;