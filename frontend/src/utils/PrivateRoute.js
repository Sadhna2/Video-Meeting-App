import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        Loading...
      </div>
    );
  }

  return token ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
