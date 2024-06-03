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
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as yup from "yup";
import userApi from "../api/user";
import handleError from "../services/HandleErrors";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    termAndCondition: false,
  });
  const [error, setError] = useState({});

  // Yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number is not valid"),
    address: yup.string().required("Address is required"),
    termAndCondition: yup.boolean().oneOf([true], "You must accept the terms"),
  });

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
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      try {
        const formDataSubmit = new FormData();
        formDataSubmit.append("email", formData.email);
        formDataSubmit.append("password", formData.password);
        formDataSubmit.append("firstName", formData.firstName);
        formDataSubmit.append("lastName", formData.lastName);
        formDataSubmit.append("dateOfBirth", formData.dateOfBirth);
        formDataSubmit.append("phoneNumber", formData.phoneNumber);
        formDataSubmit.append("address", formData.address);

        console.log(formDataSubmit);

        await userApi.register(formDataSubmit);

        navigate("/login");
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      const newError = {};
      error.inner.forEach((e) => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  return (
    <>
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
                      onSubmit={handleSubmit}
                      className="needs-validation"
                      noValidate
                    >
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={error.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          isInvalid={error.password}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.password}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          onChange={handleChange}
                          isInvalid={error.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          isInvalid={error.firstName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.firstName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          isInvalid={error.lastName}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.lastName}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          isInvalid={error.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.dateOfBirth}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          isInvalid={error.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.phoneNumber}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          isInvalid={error.address}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.address}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Check className="mb-3">
                        <Form.Check.Input
                          type="checkbox"
                          name="termAndCondition"
                          onChange={handleCheckboxChange}
                          isInvalid={error.termAndCondition}
                        />
                        <Form.Check.Label>
                          I agree to the conditions and regulations of HCS
                        </Form.Check.Label>
                        <Form.Control.Feedback type="invalid">
                          {error.termAndCondition}
                        </Form.Control.Feedback>
                      </Form.Check>

                      <div className="d-grid">
                      <Button
                        variant="warning"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" variant="dark" />
                        ) : (
                          "Sign up"
                        )}
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
    </>
  );
}

export default Register;
