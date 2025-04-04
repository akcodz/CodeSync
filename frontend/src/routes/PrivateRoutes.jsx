import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  const { user } = useContext(UserContext);

  if (!user || !token) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the children components
  return children;
};

export default PrivateRoute;