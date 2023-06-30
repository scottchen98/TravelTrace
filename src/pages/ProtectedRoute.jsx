import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated && children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
