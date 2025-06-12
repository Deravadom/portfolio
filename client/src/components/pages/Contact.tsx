import { Link } from "react-router";
import Col from "../flex/Col";
import Row from "../flex/Row";

type ItemProps = {
  label: string;
  href: string;
  value: string;
}

const Item = ({ label, href, value }: ItemProps) => (
  <Link to={href} className="hover:bg-background rounded-lg p-2 w-full">
    <Row className="w-full justify-between gap-4">
      <p className="mb-2 text-component">{label}:</p>
      <span className="text-variable hover:underline">{value}</span>
    </Row>
  </Link>
);

const Contact = () => {
  return (
    <Col className="items-center justify-center w-full h-full p-4">
      <h1 className="text-3xl font-bold mb-4 text-component">Contact Me</h1>
      <p className="mb-2 text-element">Feel free to reach out via email or connect with me on social media!</p>
      <Col className="max-w-1/4 p-4 bg-scrollbar rounded-lg shadow-md">
        <Item
          label="Email"
          href="mailto:michael.needleman01@gmail.com"
          value="michael.needleman01@gmail.com"
        />
        <Item
          label="LinkedIn"
          href="https://www.linkedin.com/in/michaelneedleman1/"
          value="Michael Needleman"
        />
        <Item
          label="GitHub"
          href="https://github.com/deravadom"
          value="deravadom"
        />
      </Col>
    </Col>
  );
}
export default Contact;