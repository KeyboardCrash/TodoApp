import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAppContext } from "../lib/contextLib";
import Login from "./Login/Login";

const RouteRequiresAuth = props => {
   const { isAuthenticated } = useAppContext();

   return isAuthenticated? <Outlet /> : <Navigate to='/login' />;
};

export default RouteRequiresAuth;