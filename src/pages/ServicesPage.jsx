import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

import FullLayout from "../components/layouts/User/Full";
import React, { useState } from "react";

function ServicesPage() {
  const [show, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!show);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <FullLayout>
      <Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              Make An Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form action="">
              <div className="mb-3">
                <label>Email</label>
                <input type="email" name="email" className="form-control" />
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" name="email" className="form-control" />
                <div className="invalid-feedback"></div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Save Changes</Button>
          </Modal.Footer>
        </Modal>
        <div className="text-center mt-5">
          <h2 className="fw-bold">All Services</h2>
        </div>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service1.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">General Testing</h3>

              <h5>
                Our general testing service provides essential diagnostic tests
                to assess your overall health and identify any potential issues.
                From blood tests to screening for common conditions, we offer a
                range of tests to help you monitor and maintain your well-being.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service2.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">Clinical Examination</h3>
              <h5>
                Our clinical examination service involves thorough physical
                assessments by our skilled healthcare professionals. Through
                detailed examinations and medical history reviews, we aim to
                detect any signs of illness or abnormalities early on for prompt
                intervention.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service4.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">Treatment of Diseases</h3>
              <h5>
                Our treatment of diseases service offers comprehensive care for
                various health conditions. From chronic illnesses to acute
                ailments, our team of specialists provides personalized
                treatment plans to manage your symptoms and improve your quality
                of life.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service5.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">In-depth Consulting</h3>
              <h5>
                Our in-depth consulting service offers comprehensive evaluations
                and personalized guidance tailored to your specific health
                needs. Our experienced consultants will work closely with you to
                understand your concerns and develop effective strategies to
                address them.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service3.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">Image Analysis</h3>
              <h5>
                Our image analysis service utilizes advanced imaging
                technologies to examine internal structures and identify
                abnormalities. From X-rays to MRI scans, our expert radiologists
                provide accurate interpretations to aid in diagnosis and
                treatment planning.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="mt-4 mb-4" md={6}>
            <img
              src="image/service6.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-4">
            <div>
              <h3 className="fw-bold">General Health Examination</h3>
              <h5>
                Providing a holistic assessment of overall health, this service
                offers a comprehensive overview but may be less specific than
                targeted clinical examinations, affecting its popularity
                ranking.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </FullLayout>
  );
}
export default ServicesPage;
