import React from "react";
import Menu from "../Menu";
import { useAuth } from "../../Auth/auth";
import { Roles } from "../../Auth/Roles";
import AuthenHOC from "../AuthenHOC";
const Dashboard = () => {
  const { authUser } = useAuth();
  return <Menu></Menu>;
};

export default AuthenHOC(Dashboard, [
  Roles.USER,
  Roles.COMPANY,
]);
