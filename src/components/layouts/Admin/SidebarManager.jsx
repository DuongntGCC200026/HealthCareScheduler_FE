import { Link } from "react-router-dom";
import authService from "../../../services/AuthService";
import React, { useEffect, useState } from "react";

// import authService from "../../services/AuthService";

const SideBarManager = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = authService.getUserRole();
    setUserRole(role);
  }, []);
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {userRole === "Doctor" && (
          <>
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/admin/performMedical">
                <span>Appointment</span>
              </Link>
            </li>
          </>
        )}
        {userRole !== "Doctor" && (
          <>
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/admin/appointment">
                <span>Appointment</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link collapsed" to="/admin/doctor">
                <span>Doctor</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
};

export default SideBarManager;
