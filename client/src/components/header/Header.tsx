import { Link } from "react-router"
import Row from "../flex/Row"

const Header = () => {
  const ctaClass = "cursor-pointer text-xl rounded hover:bg-secondary text-ultralight"
  return (
    <Row className="w-full border items-center justify-between gap-8 drop-shadow-lg drop-shadow-cyan-500 px-8">
      <Row className="gap-4">
        <span className={`${ctaClass} justify-self-start`}>Michael Needleman</span>
      </Row>
      <Row className="gap-12">
        <Link to="/home">
          <span className={ctaClass}>Home</span>
        </Link>
        <Link to='/about'>
          <span className={ctaClass}>About Me</span>
        </Link>
        <Link to='/blog'>
          <span className={ctaClass}>Blog</span>
        </Link>
        <Link to='/projects'>
          <span className={ctaClass}>Projects</span>
        </Link>
        <Link to='/contact'>
          <span className={ctaClass}>Contact</span>
        </Link>
      </Row>
    </Row>
  )
}

export default Header