import React from "react";
import FullLayout from "../components/layouts/User/Full";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  return (
    <FullLayout>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card bg="light" className="mt-4">
              <Card.Body>
                <Card.Title className="text-center">
                  <h2 className="fw-bold">Register</h2>
                </Card.Title>
                <Card.Text>
                  <Form
                    // onSubmit={handleSubmit}
                    className="needs-validation"
                    noValidate
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        // value={formData.email}
                        // onChange={handleChange}
                        // isInvalid={error.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.email} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        // isInvalid={error.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.password} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        // onChange={handleChange}
                        // isInvalid={error.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.confirmPassword} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="firstName"
                        name="firstName"
                        // value={formData.firstName}
                        // onChange={handleChange}
                        // isInvalid={error.firstName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.firstName} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="lastName"
                        name="lastName"
                        // value={formData.lastName}
                        // onChange={handleChange}
                        // isInvalid={error.lastName}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.lastName} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        // value={formData.dateOfBirth}
                        // onChange={handleChange}
                        // isInvalid={error.dateOfBirth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.dateOfBirth} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        // value={formData.phoneNumber}
                        // onChange={handleChange}
                        // isInvalid={error.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.phoneNumber} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="address"
                        // value={formData.address}
                        // onChange={handleChange}
                        // isInvalid={error.address}
                      />
                      <Form.Control.Feedback type="invalid">
                        {/* {error.address} */}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Check className="mb-3">
                      <Form.Check.Input
                        type="checkbox"
                        name="termAndCondition"
                        // onChange={handleCheckboxChange}
                        // isInvalid={error.termAndCondition}
                      />
                      <Form.Check.Label>
                        I agree to the conditions and regulations of
                        HCS
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        {/* {error.termAndCondition} */}
                      </Form.Control.Feedback>
                    </Form.Check>

                    <div className="d-grid">
                      <Button
                        variant="info"
                        type="submit"
                        // disabled={isLoading}
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3 text-center">
                    <div className="border-1">
                      Don’t have an account? <Link to="/login">Login</Link>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </FullLayout>
  );
}

export default Register;
