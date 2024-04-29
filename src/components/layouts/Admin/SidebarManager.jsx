import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";

const SideBarManager = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/admin/manager">
            <span>Dashboard</span>
          </Link>
        </li>

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
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/patient">
            <span>Patient</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/feedback">
            <span>Feedback</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBarManager;
