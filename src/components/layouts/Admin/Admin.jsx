import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import SideBar from "./SidebarAdmin";
import "./Admin.css";
import authService from "../../../services/AuthService";
import "../Admin/Admin.css";
import "bootstrap/dist/css/bootstrap.min.css";
import swalService from "../../../services/SwalService";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await authService.getUserRole();
      setUserData(user);
    };

    fetchUserData();

    // Check initial screen width
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }

    // Add event listener to check screen width on resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
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
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <Link
            to="/admin/dashboard"
            className="logo d-flex align-items-center"
          >
            <img src="/image/logo.png" alt="" />
          </Link>
        </div>

        <nav className="header-nav ms-auto me-4">
          <div className="dropdown">
            <button
              className="btn btn-light dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              //boostrap 5 MUST HAVE -bs
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <a className="text-center me-3 fw-bold text-secondary" href="#">
                Hi, 
                {" "  + userData}
              </a>
              <Image
                src="/image/user.png"
                width={30}
                height={30}
                roundedCircle
              />
            </button>
            <div
              className="dropdown-menu mt-2"
              aria-labelledby="dropdownMenuButton"
            >
              <a className="dropdown-item" onClick={handleLogout}>
                <i className="bi bi-door-open-fill me-3"></i>
                Logout
              </a>
            </div>
          </div>
        </nav>
      </header>
      {isSidebarOpen && <SideBar />}
      <main
        id="main"
        className={`${isSidebarOpen ? "" : "main-sidebar-closed"}`}
      >
        {children}
      </main>
    </>
  );
};

export default AdminLayout;
