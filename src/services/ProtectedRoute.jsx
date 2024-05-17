// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ProtectedRoute = ({ element, ...rest }) => {
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      return <Navigate to="/" replace />;
    }
  }, [token]);

  return token ? <Route {...rest} element={element} /> : null;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
