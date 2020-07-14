import React, { useState } from "react";
import logo from "./logo.svg";
import FormLogin from "./Component/FormLogin";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Dashboard from "./Component/DashBoard";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/auth";
function App() {
  const existingUser = JSON.parse(localStorage.getItem("user"));
  const [authUser, setAuthUsers] = useState(existingUser);

  const setTokens = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setAuthUsers(data);
  };
  return (
    <div>
      <AuthContext.Provider
        value={{
          authUser,
          setAuthUsers: setTokens,
        }}
      >
        <Router>
          <Route exact path="/" component={FormLogin}></Route>
          <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
