import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = (props) => {
  const token = localStorage.getItem("Authorization");
  if (!token) return <Redirect to={{ pathname: "/login" }} />;
  return <Route {...props} />;
};

export default ProtectedRoute;
