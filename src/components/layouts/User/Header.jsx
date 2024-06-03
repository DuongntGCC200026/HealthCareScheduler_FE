import React, { useEffect, useState } from "react";
import HCS from "/image/logo.png";
import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import swalService from "../../../services/SwalService";
import "../Admin/Admin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getUserData();
    setUserData(user);
  }, []);

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const handleLogout = () => {
    swalService.confirmToHandle(
      "Are you sure you want to logout?",
      "warning",
      () => {
        authService.logout();
        navigate("/");
      }
    );
  };
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
                  {isAuthenticated() && (
                    <Link className="nav-link ms-3 navHover" to="/myAppointment">
                      Appoinment
                    </Link>
                  )}
                  <Link className="nav-link ms-3 navHover" to="/about">
                    About
                  </Link>
                </Nav>
                <div className="text-center">
                  {isAuthenticated() ? (
                    <>
                      <div class="dropdown">
                        <button
                          class="btn btn-light dropdown-toggle"
                          type="button"
                          id="dropdownMenuButton"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <Image
                            src="/image/user.png"
                            width={30}
                            height={30}
                            roundedCircle
                          />
                        </button>
                        <div
                          class="dropdown-menu mt-2"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <a class="dropdown-item" href="/profile">
                          <i class="bi bi-person-fill me-3"></i>
                            Profile
                          </a>
                          <a>
                            <hr className="dropdown-divider" />
                          </a>
                          <a class="dropdown-item" href="/myAppointment">
                          <i class="bi bi-calendar2-heart-fill me-3"></i>
                            Booking
                          </a>
                          <a>
                            <hr className="dropdown-divider" />
                          </a>
                          <a class="dropdown-item" onClick={handleLogout}>
                          <i class="bi bi-door-open-fill me-3"></i>
                            Logout
                          </a>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
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
