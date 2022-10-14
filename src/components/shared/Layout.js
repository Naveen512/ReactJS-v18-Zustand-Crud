import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand>Cakes</Navbar.Brand>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
