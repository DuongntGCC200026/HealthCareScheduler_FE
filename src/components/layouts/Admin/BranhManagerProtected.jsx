import { useNavigate } from "react-router-dom";
import authService from "../../../services/AuthService";
import swalService from "../../../services/SwalService";

const BranchProtected = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isBranchManager = () => {
    return authService.getUserRole() === "BranchManagement";
  };

  console.log(isBranchManager());

  if (isAuthenticated() && isBranchManager()) {
    return children;
  }

  swalService.showMessageToHandle(
    "Warning",
    "You are not authorized to access this page",
    "warning",
    () => navigate("/")
  );
};

export default BranchProtected;
