import { Link, To } from "react-router"
import Row from "../flex/Row"

type CtaProps = {
  to: To
  label: string
}
const Cta = ({ to, label }: CtaProps) => {
  return (
    <Link to={to}>
      <span className="cursor-pointer text-xl rounded hover:bg-secondary text-raw">
        {label}
      </span>
    </Link>
  )
}

const Header = () => {
  const ctaClass = "cursor-pointer text-xl rounded hover:bg-secondary text-raw"
  return (
    <Row className="w-full border items-center justify-between gap-8 px-8">
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