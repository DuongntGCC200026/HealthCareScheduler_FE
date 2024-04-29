import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";

const SideBar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link " to="/admin/dashboard">
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/branch">
            <span>Branch</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/branch">
            <span>Service</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/branch">
            <span>User</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/branch">
            <span>Feedback</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
