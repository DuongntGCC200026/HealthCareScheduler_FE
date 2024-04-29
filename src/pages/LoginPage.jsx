import React from 'react';
import FullLayout from "../components/layouts/User/Full";
import {
    Button,
    Card,
    Col,
    Container,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { Link } from 'react-router-dom';


function LoginPage() {
    return (
        <FullLayout>
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card bg="light" className="mt-4">
                            <Card.Body>
                                <Card.Title className="text-center">
                                    <h2 className="fw-bold">Login</h2>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-center text-muted">
                                    Please log in to access your account.
                                </Card.Subtitle>
                                <Card.Text>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                            // value={formData.email}
                                            // onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {/* {error.email ? error.email : ""} */}
                                            </div>
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicPassword"
                                        >
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                            // value={formData.password}
                                            // onChange={handleChange}
                                            />
                                            <div className="invalid-feedback">
                                                {/* {error.password ? error.password : ""} */}
                                            </div>
                                        </Form.Group>
                                        <Form.Group className="mb-3 text-end">
                                            <Form.Text className="text-muted">
                                                <Link to="#">Forgot password?</Link>
                                            </Form.Text>
                                        </Form.Group>

                                        <Form.Group
                                            className="mb-3"
                                            controlId="formBasicCheckbox"
                                        >
                                            <Form.Check type="checkbox" label="Rememeber me" />
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button
                                                variant="info"
                                                type="submit"
                                            // disabled={isLoading}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                    <div className="mt-3 text-center">
                                        <div className="border-1">
                                            Don’t have an account?{" "}
                                            <Link to="/register">Sign Up</Link>
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

export default LoginPage;