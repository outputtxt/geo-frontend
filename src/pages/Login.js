import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import AuthService from "../service/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Zorunlu Alan!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password);
      navigate("/");
      window.location.reload();

      //   AuthService.login(username, password).then(
      //     () => {
      //       navigate("/");
      //       window.location.reload();
      //     },
      //     (error) => {
      //       const resMessage =
      //         (error.response &&
      //           error.response.data &&
      //           error.response.data.message) ||
      //         error.message ||
      //         error.toString();

      //       setLoading(false);
      //       setMessage(resMessage);
      //     },
      //   );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <AccountCircleIcon sx={{ fontSize: 180, color: "gray" }} />
      </div>
    </div>
  );
};

export default Login;
