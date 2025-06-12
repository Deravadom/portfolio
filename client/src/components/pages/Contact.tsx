import Col from "../flex/Col";
import Row from "../flex/Row";

const Contact = () => {
  return (
    <Col className="items-center justify-center w-full h-full p-4">
      <h1 className="text-3xl font-bold mb-4 text-component">Contact Me</h1>
      <p className="mb-2 text-element">Feel free to reach out via email or connect with me on social media!</p>
      <Col className="max-w-1/4 p-4 bg-scrollbar rounded-lg shadow-md">
        <Row className="w-full justify-between gap-8">
          <p className="mb-2 text-keyword">Email:</p>
          <a href="mailto:michael.needleman01@gmail.com" className="text-blue-500 hover:underline">michael.needleman01@gmail.com</a>
        </Row>
        <Row className="w-full justify-between gap-8">
          <p className="mb-2 text-keyword">LinkedIn:</p>
          <a href="https://www.linkedin.com/in/michael-needleman/" className="text-blue-500 hover:underline">Michael Needleman</a>
        </Row>
        <Row className="w-full justify-between gap-8">
          <p className="mb-2 text-keyword">GitHub:</p>
          <a href="https://github.com/deravadom" className="text-blue-500 hover:underline">deravadom</a>
        </Row>
      </Col>
    </Col>
  );
}
export default Contact;