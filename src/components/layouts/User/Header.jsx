import React, { useEffect, useState } from "react";
import HCS from "/image/logo.png";
import {
  Button,
  ButtonGroup,
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Container fluid>
        <Navbar expand="md" bg="info" className="mb-3 align-middle">
          <Container>
            <Navbar.Brand href="#">
              <Link to="/" className="bs-light-border-subtle">
                <img
                  src={HCS}
                  width="170"
                  height="50"
                  className="d-inline-block align-top"
                  alt="HCS logo"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="end"
            >
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 text-center fs-5">
                  <Link className="nav-link ms-3 navHover" to="/">
                    Home
                  </Link>
                  <Link className="nav-link ms-3 navHover" to="/services">
                    Services
                  </Link>
                  {/* {isStudent() && (
                                        <Link className="nav-link" to="/submission">
                                            Submission
                                        </Link>
                                    )} */}
                  <Link className="nav-link ms-3 navHover" to="/about">
                    About
                  </Link>
                </Nav>
                <div className="text-center">
                  {/* <h5 className="mt-2">Hi, Hoang Dy</h5> */}
                  <Link to="/register">
                    <Button
                      variant="contained"
                      className="mt-2 me-2 btnSignUp"
                      style={{
                        borderColor: "black",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="contained"
                      className="mt-2 me-4 btnSignUp"
                      style={{
                        borderColor: "black",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      Login
                    </Button>
                  </Link>
                  {/* {isAuthenticated() ? (
                                        <>
                                            <div className="btn-group">
                                                <button
                                                    type="button"
                                                    className="btn btn-light dropdown-toggle"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    <Image
                                                        src={
                                                            userData?.profilePicture
                                                                ? `/api/users/${userData?.userId}/image`
                                                                : "/image/default-avatar.png"
                                                        }
                                                        width={30}
                                                        height={30}
                                                        roundedCircle
                                                    />
                                                </button>
                                                <ul className="dropdown-menu">
                                                    <li>
                                                        <a className="dropdown-item" href="#">
                                                            Hi {userData?.firstName}
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li>
                                                        <Link className="dropdown-item" to="/profile">
                                                            My Profile
                                                        </Link>
                                                    </li>
                                                    {isStudent() && (
                                                        <li>
                                                            <Link
                                                                className="dropdown-item"
                                                                to="/my-contribution"
                                                            >
                                                                My Contribution
                                                            </Link>
                                                        </li>
                                                    )}
                                                    <li>
                                                        <hr className="dropdown-divider" />
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={handleLogout}
                                                        >
                                                            Logout
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/register">
                                                <Button variant="outline-warning" className="me-2">
                                                    Sign Up
                                                </Button>
                                            </Link>
                                            <Link to="/login">
                                                <Button variant="warning" className="me-4">
                                                    Login
                                                </Button>
                                            </Link>
                                        </>
                                    )} */}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
};
export default Header;
