import { useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import swalService from "../../../services/SwalService";

const DoctorProtected = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isDoctor = () => {
    return authService.getUserRole() === "Doctor";
  };

  console.log(isDoctor());

  if (isAuthenticated() && isDoctor()) {
    return children;
  }

  swalService.showMessageToHandle(
    "Warning",
    "You are not authorized to access this page",
    "warning",
    () => navigate("/")
  );
};

export default DoctorProtected;
