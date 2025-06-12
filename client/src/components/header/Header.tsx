import { Link, To } from "react-router"
import Row from "../flex/Row"

type CtaProps = {
  to: To
  label: string
}
const Cta = ({ to, label }: CtaProps) => {
  return (
    <Link to={to} className="py-4 hover:bg-background rounded-lg">
      <span className="cursor-pointer text-2xl text-raw">
        {label}
      </span>
    </Link>
  )
}

const Header = () => {
  const ctaClass = "cursor-pointer text-2xl rounded hover:bg-background text-raw"
  return (
    <Row className="w-full items-center justify-between gap-8 px-8 bg-scrollbar">
      <Row className="gap-4">
        <span className={`${ctaClass} justify-self-start`}>Michael Needleman</span>
      </Row>
      <Row className="gap-12">
        <Cta to="/home" label="Home" />
        <Cta to='/about' label="About Me" />
        <Cta to='/blog' label="Blog" />
        <Cta to='/projects' label="Projects" />
        <Cta to='/contact' label="Contact" />
      </Row>
    </Row>
  )
}

export default Header