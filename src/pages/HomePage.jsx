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
  Spinner,
} from "react-bootstrap";
import FullLayout from "../components/layouts/User/Full";
import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import handleError from "../services/HandleErrors";
import serviceApi from "../api/service";
import branchApi from "../api/branch";
import authService from "../services/AuthService";
import appointmentApi from "../api/appointment";
import formatDateTime from "../services/FormatDateTime";
import * as yup from "yup";
import swalService from "../services/SwalService";

function HomePage() {
  const [services, setServices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [userData, setUserData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    appointmentId: "",
    userId: "",
    dateTime: "",
    branchId: "",
    noted: "",
    serviceId: "",
    status: "",
    createdDate: "",
    termAndCondition: false,
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShowModal(false);
    setError({});
    setFormData({
      appointmentId: "",
      userId: "",
      dateTime: "",
      branchId: "",
      noted: "",
      serviceId: "",
      status: "",
      createdDate: "",
      termAndCondition: false,
    });
  };

  const [show, setShowModal] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      termAndCondition: event.target.checked,
    });
  };

  // Form
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        dateTime: yup
          .date()
          .required("Date of Birth is required")
          .min(new Date(), "Date must be in the future"),
        branchId: yup.string().required("Branch is required"),
        serviceId: yup.string().required("Service is required"),
        termAndCondition: yup
          .boolean()
          .oneOf([true], "You must accept the terms"),
      });
      await modifiedSchema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      try {
        const AppointmentData = {
          patientId: userData.userId,
          doctorId: null,
          serviceId: formData.serviceId,
          branchId: formData.branchId,
          dateTime: formData.dateTime,
          status: "Pending",
          createdDate: new Date(),
          noted: formData.noted,
        };
        console.log(AppointmentData);
        await appointmentApi.AddNew(AppointmentData);
        handleClose();
        swalService.showMessage(
          "Success",
          "Appointment added successfully",
          "success"
        );
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isDoctor = () => {
    return authService.getUserRole() === "Doctor";
  };

  const isBranchManager = () => {
    return authService.getUserRole() === "BranchManagement";
  };

  const isAdmin = () => {
    return authService.getUserRole() === "Administrator";
  };

  const handleShow = () => {
    if (isAuthenticated()) {
      setShowModal(!show);
    } else {
      navigate("/login");
    }
  };

  if (isAuthenticated()) {
    if (isDoctor()) {
      return <Navigate to="/admin/performMedical" />;
    }
    if (isBranchManager()) {
      return <Navigate to="/admin/appointment" />;
    }
    if (isBranchManager()) {
      return <Navigate to="/admin/appointment" />;
    }
    if (isAdmin()) {
      return <Navigate to="/admin/user" />;
    }
  }

  // const isBranchManager = () => {
  //   return authService.getUserRole() === "BranchManagement";
  // };

  // const isAdministrator = () => {
  //   return authService.getUserRole() === "Administrator";
  // };
  // if (isAuthenticated()) {
  //   if (isDoctor()) {
  //     return <Navigate to="/admin/performMedical" />;
  //   } else if (isBranchManager()) {
  //     return <Navigate to="/admin/manageAppointment" />;
  //   } else if (isAdministrator()) {
  //     return <Navigate to="/admin/user" />;
  //   } else {
  //     console.log(authService.getUserRole());

  //     return <Navigate to="/" />;
  //   }
  // }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        setUserData(user);
        const service = await serviceApi.getAll();
        setServices(service);
        const branch = await branchApi.getAll();
        setBranches(branch);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);
  return (
    <FullLayout>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">
              Make an Appointment
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Select Branch</label>
              <select
                name="branchId"
                className={`form-control ${error.branchId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="">-- Please choose branch --</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch.branchId}>
                    {branch.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.branchId}</div>
            </div>

            <div className="mb-3">
              <label>Select Service</label>
              <select
                name="serviceId"
                className={`form-control ${
                  error.serviceId ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                onChange={handleChange}
              >
                <option value="">-- Please choose service --</option>
                {services.map((service, index) => (
                  <option key={index} value={service.serviceId}>
                    {service.serviceName}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.serviceId}</div>
            </div>

            <div className="mb-3">
              <label>Date and Time</label>
              <input
                type="datetime-local"
                name="dateTime"
                className={`form-control ${error.dateTime ? "is-invalid" : ""}`}
                onChange={handleChange}
              ></input>
              <div className="invalid-feedback">{error.dateTime}</div>
            </div>

            <div className="mb-3">
              <label>Noted</label>
              <textarea
                name="noted"
                className="form-control"
                rows={4}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <input
                type="checkbox"
                name="termAndCondition"
                onChange={handleCheckboxChange}
                className={`ms-2 ${error.termAndCondition ? "is-invalid" : ""}`}
              ></input>
              <label className="ms-3">
                Please bring your medical history (if any) and arrive 15 minutes
                early.
              </label>
              <div className="invalid-feedback">{error.termAndCondition}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
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
