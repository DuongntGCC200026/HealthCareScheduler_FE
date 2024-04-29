import { Link } from "react-router-dom";
// import UniLogo from "/image/logo.png";
import { Button, Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-info mx-3 ">
      <Container>
        <Row className="py-5 my-5 border-bottom text-white">
          <Col md={12} lg={6} className="mb-3">
            <ul className="nav flex-column text-light">
              <li className="nav-item mb-2">
                <Link to="#" className="nav-link p-0 text-white ">
                  <i className="bi bi-envelope-fill"></i> nd0710w@gre.ac.uk
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="#" className="nav-link p-0 text-white">
                  <i className="bi bi-telephone-fill"></i> +84 375741165
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="#" className="nav-link p-0 text-white">
                  <i className="bi bi-geo-alt-fill"></i> Ninh Kieu, Can Tho,
                  Vietnam
                </Link>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={4} lg={2} className="mb-3 white">
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link to="/" className="nav-link p-0 text-white">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/services" className="nav-link p-0 text-white">
                  Service
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link to="/about" className="nav-link p-0 text-white">
                  About
                </Link>
              </li>
            </ul>
          </Col>

          <Col sm={12} md={4} lg={2} className="mb-3">
            <h5 className="fw-bold">Social Profiles</h5>
            <ul className="nav flex-row">
              <li className="nav-item me-2">
                <Link
                  target="_blank"
                  to="#"
                  className="nav-link p-0 text-muted"
                >
                  <Button variant="light">
                    <i className="bi bi-facebook"></i>
                  </Button>
                </Link>
              </li>
              <li className="nav-item me-2">
                <Link
                  target="_blank"
                  to="#"
                  className="nav-link p-0 text-muted"
                >
                  <Button variant="light">
                    <i className="bi bi-github"></i>
                  </Button>
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
        <p className="text-center text-body-secondary mb-0 pb-4">
          © 2024 Health Care Scheduler
        </p>
      </Container>
    </footer>
  );
};
export default Footer;
