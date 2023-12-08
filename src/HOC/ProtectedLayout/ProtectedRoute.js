import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setAuthorization } from "../../services/apiService/configURL";
import { userDataLocal } from "../../services/localService/localService";
import PropTypes from "prop-types";

ProtectedRoute.propTypes = {
  children: PropTypes.string,
};
export default function ProtectedRoute({ children }) {
  let { token } = userDataLocal.get();
  const login_type = localStorage.getItem("LOGIN_TYPE");
  if (!token) {
    return (
      <Navigate
        to={`${login_type === "password" ? "/login" : "/login"}`}
        replace
      />
    );
  } else {
    setAuthorization(token);
    return <div>{children ? children : <Outlet />}</div>;
  }
}
