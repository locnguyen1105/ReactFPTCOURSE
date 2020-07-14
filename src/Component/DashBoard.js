import React from "react";
import Menu from "./Menu";
import { useAuth, AuthContext } from "../context/auth.js";
import { Roles } from "../Roles";
import AuthenHOC from "./AuthenHOC";
const Dashboard = () => {
  const { authUser } = useAuth();
  return <Menu></Menu>;
};

export default AuthenHOC(Dashboard, [
  Roles.Admin,
  Roles.Student,
  Roles.Lecturer,
]);
