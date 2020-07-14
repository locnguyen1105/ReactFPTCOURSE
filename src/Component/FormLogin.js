import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../context/auth.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
function FormLogin(props) {
  const referer = props.location.state ? props.location.state.referer : "/";
  const [isLogin, setIsLogin] = useState(false);
  const { setAuthUsers, authUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    username: "",
    password: "",
  });
  const useStyles = makeStyles((theme) => ({
    postgress: {
      position: "fixed",
      top: "50%",
    },
  }));
  const classes = useStyles();
  const [errors, setErrors] = useState();
  let validate = true;
  const url = `/login`;
  const data = {
    username: fields["username"],
    password: fields["password"],
  };
  const validation = () => {
    if (fields["username"] === "" || fields["username"] == null) {
      setErrors("Username cannot empty !");
      validate = false;
    } else if (fields["password"] === "" || fields["password"] == null) {
      setErrors("Password cannot empty !");
      validate = false;
    }
    return validate;
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (validation()) {
      Axios.post(url, data)
        .then((response) => {
          if (response !== null) {
            setAuthUsers({
              tokens: response.data.accessToken,
              roles: response.data.roles,
              student: response.data.student,
            });
            setIsLogin(true);
          }
        })
        .catch((error) => {
          setLoading(false);
          setErrors(error.response.data.message);
        });
    }
  };
  if (!localStorage.getItem("tokenlogin")) {
    if (isLogin) {
      localStorage.setItem("tokenlogin", authUser.tokens + "login");
      return <Redirect to={!referer === "/" ? referer : "/dashboard"} />;
    }
  } else {
    return <Redirect to={"/dashboard"} />;
  }

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form action="post" onSubmit={onSubmit} className="App">
        <h4>Login Form</h4>
        <div style={{ margin: "0 auto 10px" }} className=" w-25 text-center">
          {errors ? <Alert severity="error">{errors}</Alert> : null}
        </div>
        <div>
          <TextField
            name="username"
            onChange={handleChange}
            className="margin-all"
            label="Username"
          ></TextField>
        </div>
        <div>
          <TextField
            name="password"
            type="password"
            onChange={handleChange}
            label="Password"
            className="margin-all"
          ></TextField>
        </div>
        <div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ margin: 10 }}
          >
            Submit
          </Button>
        </div>
        {loading ? <CircularProgress /> : ""}
      </form>
    </div>
  );
}
export default FormLogin;
