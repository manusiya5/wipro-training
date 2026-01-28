import { Navigate } from "react-router-dom";

const ProtectedUser = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedUser;
