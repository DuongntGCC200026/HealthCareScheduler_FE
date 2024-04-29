// HomePage.jsx
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import FullLayout from "../components/layouts/User/Full";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function HomePage() {
  const [show, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!show);
  };

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <FullLayout>
      <section className="m-5">
        <Row className="mt-5 py-5">
          <Col
            md={6}
            className="d-flex justify-content-center align-items-center"
          >
            <section className="py-5">
              <Container className="text-center intro-img">
                <div>
                  <img
                    className="mb-4 me-5"
                    width={350}
                    height={95}
                    src="image/logo.png"
                    alt="Description of the image"
                  />
                </div>
                <h1 className="fw-bold">
                  Welcome to the Health Center Scheduler
                </h1>
                <h4 className="fst-italic">
                  Where quality healthcare meets convenience.
                </h4>
                <div className="mt-4">
                  <Button onClick={handleShow} variant="outline-info" size="lg">
                    MAKE AN APPOINTMENT NOW
                  </Button>
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
                        Make an Appointment
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form action="">
                        <div className="mb-3">
                          <label>Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                          />
                          <div className="invalid-feedback"></div>
                        </div>

                        <div className="mb-3">
                          <label>Select Branch</label>
                          <select
                            type="email"
                            name="email"
                            className="form-control"
                          >
                            <option value="option1">-- No Chosen --</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                          </select>
                          <div className="invalid-feedback"></div>
                        </div>

                        <div className="mb-3">
                          <label>Select Service</label>
                          <select className="form-control">
                            <option value="option1">-- No Chosen --</option>
                            <option value="option2">Option 2</option>
                            <option value="option3">Option 3</option>
                            <option value="option4">Option 4</option>
                          </select>
                          <div className="invalid-feedback"></div>
                        </div>

                        <div className="mb-3">
                          <label>Date and Time</label>
                          <input
                            type="datetime-local"
                            id="meetingDate"
                            name="meetingDate"
                            className="form-control"
                          ></input>
                          <div className="invalid-feedback"></div>
                        </div>

                        <div className="mb-3">
                          <label>Note</label>
                          <textarea
                            className="form-control"
                            rows={4}
                          ></textarea>
                          <div className="invalid-feedback"></div>
                        </div>

                        <div className="mb-3">
                          <input
                            type="checkbox"
                            id="myCheckbox"
                            name="myCheckbox"
                            value="yes"
                          ></input>
                          <label className="ms-2">
                            Please bring your medical history (if any) and
                            arrive 15 minutes early.
                          </label>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary">Confirm</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                <div>
                  <Link to="/about">
                    <Button variant="outline-primary mt-3" size="lg">
                      See More
                    </Button>
                  </Link>
                </div>
              </Container>
            </section>
          </Col>
          <Col md={6} className="mt-5 py-5">
            <section className="mt-2">
              <Container>
                <div className="video-container">
                  <video
                    src="video/introVideo.mp4"
                    controls
                    autoPlay
                    muted
                  ></video>
                </div>
              </Container>
            </section>
          </Col>
        </Row>
      </section>

      <Container className="mt-5 py-5">
        <div className="text-center">
          <h2 className="fw-bold">Top Services</h2>
        </div>
        <div className="mt-3">
          <p>
            The Health Center Scheduler offers a comprehensive range of services
            aimed at promoting optimal health and wellness. From in-depth
            consulting sessions to general testing and clinical examinations,
            patients receive thorough evaluations tailored to their individual
            needs. Utilizing advanced image analysis technology, the center
            ensures accurate diagnostics for precise treatment planning.
            Services encompass general health examinations, including disease
            prevention and management, with a focus on providing personalized
            treatment plans for various health conditions, thus fostering
            overall well-being and longevity.
          </p>
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
                With a focus on comprehensive care for various health
                conditions, this service addresses both chronic illnesses and
                acute ailments, appealing to those seeking targeted medical
                interventions.
              </h5>
            </div>
            <div className="mt-4">
              <Button onClick={handleShow} variant="outline-info" size="lg">
                SCHEDULE AN EXAMINATION
              </Button>
            </div>
          </Col>
          <section>
            <div className="me-5 d-flex justify-content-center alignItems-center">
              <Link to="/services">
                <Button className="mt-5" size="lg" variant="outline-primary">
                  See All
                </Button>
              </Link>
            </div>
          </section>
        </Row>
      </Container>

      <Container className="mt-5 py-5">
        <div className="text-center">
          <h2 className="fw-bold">Medical Specialist</h2>
        </div>
        <div>
          <p>
            A medical specialist is a highly trained doctor with rich experience
            in a specific field of medicine, such as cardiology, oncology,
            neurology, orthopedics, psychiatry, endocrinology, or
            gastroenterology. They work within multidisciplinary teams to
            diagnose, treat, and manage complex medical conditions within their
            area of expertise, contributing to improved patient outcomes and
            advancing medical knowledge.
          </p>
        </div>
        <Row className="mt-5">
          <Col md={6} lg={3}>
            <Card className="bg-light rounded-4">
              <Card.Img
                variant="top"
                src="image/Doctor4.jpg"
                className="img-fluid image-doctor"
              />
              <Card.Body>
                <Card.Title>Dr. Olivia Parker</Card.Title>
                <Card.Text>
                  <h6>Department of Dermatology</h6>
                  <h6>Department of Aesthetic Medicine</h6>
                  <p>
                    Dr. Parker is a leading expert in Dermatology and Aesthetic
                    Medicine, known for her innovative approaches to skincare.
                    She has practiced at prestigious centers such as
                    NewYork-Presbyterian Hospital.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="bg-light rounded-4">
              <Card.Img
                variant="top"
                src="image/Doctor3.jpg"
                className="img-fluid image-doctor"
              />
              <Card.Body>
                <Card.Title>Dr. Elizabeth Taylor</Card.Title>
                <Card.Text>
                  <h6>Department of Obstetrics</h6>
                  <h6>Department of Reproductive Medicine</h6>
                  <p>
                    Dr. Taylor is a respected figure in Obstetrics and
                    Gynecology, specializing in Reproductive Medicine. She has
                    contributed significantly to women's health through her work
                    at renowned institutions.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="bg-light rounded-4">
              <Card.Img
                variant="top"
                src="image/Doctor2.jpg"
                className="img-fluid image-doctor"
              />
              <Card.Body>
                <Card.Title>Dr. Michael Brown</Card.Title>
                <Card.Text>
                  <h6>Department of Orthopedics</h6>
                  <h6>Department of Sports Medicine</h6>
                  <p>
                    Dr. Brown is a renowned figure in Orthopedics and Sports
                    Medicine, renowned for his expertise in treating
                    musculoskeletal injuries. He has served at esteemed
                    institutions such as Mayo Clinic and Cleveland Clinic. He is
                    a professionals doctor.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3}>
            <Card className="bg-light rounded-4">
              <Card.Img
                variant="top"
                src="image/Doctor1.jpg"
                className="img-fluid image-doctor"
              />
              <Card.Body>
                <Card.Title>Dr. William Davis</Card.Title>
                <Card.Text>
                  <h6>Department of Gastroenterology</h6>
                  <h6>Department of Hepatology</h6>
                  <p>
                    Dr. Davis is a distinguished authority in Gastroenterology
                    and Hepatology, known for his groundbreaking research and
                    clinical contributions. He has practiced at prestigious
                    hospitals like Mount Sinai Hospital and Cedars-Sinai Medical
                    Center.
                  </p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 py-5">
        <div className="text-center">
          <h2 className="fw-bold">Medical Equipment</h2>
        </div>
        <div className="mt-3">
          <p>
            The Health Center Scheduler boasts state-of-the-art facilities
            designed to optimize patient care and streamline medical processes.
            Equipped with cutting-edge technology, including electronic medical
            records systems and advanced diagnostic tools, the center ensures
            efficient scheduling of appointments, accurate patient data
            management, and seamless communication between healthcare providers.
            With modern amenities and a patient-centric approach, the Health
            Center Scheduler prioritizes delivering high-quality care while
            enhancing the overall patient experience.
          </p>
        </div>
        <div>
          <Row>
            <Col className="mt-5">
              <img
                src="image/ME1.jpg"
                className="img-fluid same-size-image-services"
                alt=""
              />
            </Col>
            <Col className="mt-5">
              <img
                src="image/ME2.jpg"
                className="img-fluid same-size-image-services"
                alt=""
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <img
                src="image/ME3.jpg"
                className="img-fluid same-size-image-services"
                alt=""
              />
            </Col>
            <Col className="mt-5">
              <img
                src="image/ME4.jpg"
                className="img-fluid same-size-image-services"
                alt=""
              />
            </Col>
          </Row>
        </div>
      </Container>

      <Container className="mt-5 py-5">
        <div className="text-center">
          <h2 className="fw-bold">Health Center Scheduler Affiliates</h2>
        </div>
        <Row>
          <Col className="mt-5 mb-4" md={6}>
            <img
              src="image/map.jpg"
              className="img-fluid same-size-image-services"
              alt=""
            />
          </Col>
          <Col className="mt-5">
            <section>
              <Container>
                <div>
                  <h5 className="mb-4" style={{ color: "#666" }}>
                    42 Oakwood Avenue, Willowbrookshire
                  </h5>
                  <h5 className="mb-4" style={{ color: "#666" }}>
                    17 Harborfield Lane, Marblebridge
                  </h5>
                  <h5 className="mb-4" style={{ color: "#666" }}>
                    29 Riverside Drive, Lakewood-on-Thames
                  </h5>
                  <h5 className="mb-4" style={{ color: "#666" }}>
                    8 Elmwood Road, Oakvale
                  </h5>
                </div>
              </Container>
            </section>
          </Col>
        </Row>
      </Container>

      <Container className="mt-5">
        <div className="text-center">
          <h2 className="fw-bold">Feedback</h2>
        </div>
        <Row>
          <Col md={6}>
            <div className="mt-3">
              <Card className="shadow-0 border">
                <CardBody>
                  <h5>appointments@healthcare.com</h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p>
                        Book your appointments with our experienced healthcare
                        professionals. We offer a range of services to meet your
                        medical needs. Enter your details and press enter to
                        schedule your next visit.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="mt-3">
              <Card className="shadow-0 border">
                <CardBody>
                  <h5>consultations@healthcare.com</h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p>
                        Schedule your consultations with our healthcare experts.
                        Whether you need medical advice, treatment plans, or
                        second opinions, our team is here to assist you. Enter
                        your details and press enter to book your consultation.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="mt-3">
              <Card className="shadow-0 border">
                <CardBody>
                  <h5>info@healthcare.com</h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p>
                        Get in touch with us for more information about our
                        healthcare services. From preventive care to specialized
                        treatments, we offer comprehensive healthcare solutions
                        to cater to your needs. Enter your details and press
                        enter to connect with us.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="mt-3">
              <Card className="shadow-0 border">
                <CardBody>
                  <h5>support@healthcare.com</h5>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-row align-items-center">
                      <p>
                        Need assistance or have questions about our healthcare
                        services? Our support team is here to help. Enter your
                        details and press enter to reach out to our dedicated
                        support staff for prompt assistance.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Col>
          <Col Col md={6}>
            <section>
              <Container className="mt-3">
                <Row className="justify-content-center">
                  <Card>
                    <CardBody className="">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label>Email address</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="name@example.com"
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlTextarea1"
                        >
                          <Form.Label>Content</Form.Label>
                          <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                        <div className="mt-3 text-end">
                          <Button variant="info">Send</Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </Row>
              </Container>
            </section>
          </Col>
        </Row>
      </Container>
    </FullLayout>
  );
}

export default HomePage;
