import { Navigate } from "react-router-dom";
import { isAdminLoggedIn } from "./adminAuth";

const ProtectedAdmin = ({ children }) => {
  if (!isAdminLoggedIn()) {
    return <Navigate to="/adminlogin" replace />;
  }

  return children;
};

export default ProtectedAdmin;
