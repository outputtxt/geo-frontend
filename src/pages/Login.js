import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthService from "../service/auth.service";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    alert("handle login " + username + " - " + password);

    setMessage("");
    setLoading(true);

    AuthService.login(username, password);
    navigate("/");
    window.location.reload();

    setLoading(false);

    <div className="form-group">
      <button className="btn btn-primary btn-block" disabled={loading}>
        {loading && <span className="spinner-border spinner-border-sm"></span>}
        <span>Login</span>
      </button>
    </div>;

    // if (checkBtn.current.context._errors.length === 0) {
    //   AuthService.login(username, password).then(
    //     () => {
    //       props.history.push("/profile");
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
    //     }
    //   );
    // } else {
    //   setLoading(false);
    // }
  };

  return (
    <div className="full-page page-centered">
      <div className="center-flex">
        <Box component="fieldset" className="sorgu-fieldset-min">
          <AccountCircleIcon
            sx={{ fontSize: 140, color: "var(--background-color-2)" }}
          />
          <form
            onSubmit={handleSubmit(handleLogin)}
            style={{ lineHeight: "30px" }}
          >
            <div>
              <label
                htmlFor="username"
                className="sorgu-label-big"
                style={{ marginTop: "30px" }}
              >
                Kullanıcı Adı
              </label>
              <input
                style={{ minWidth: "250px", lineHeight: "30px" }}
                className={
                  errors.username
                    ? "sorgu-form-data-error"
                    : "sorgu-form-data-normal"
                }
                value={username}
                type="text"
                id="username"
                {...register("username", {
                  onChange: (event) => setUsername(event.target.value),
                  required: true,
                })}
              />
              {/* {errors.username && (
              <p className="sorgu-form-hata-label">Zorunlu Alan</p>
            )} */}
            </div>

            <div>
              <label htmlFor="password" className="sorgu-label-big">
                Parola
              </label>
              <input
                style={{ minWidth: "250px", lineHeight: "30px" }}
                className={
                  errors.password
                    ? "sorgu-form-data-error"
                    : "sorgu-form-data-normal"
                }
                value={password}
                type="password"
                id="password"
                {...register("password", {
                  onChange: (event) => setPassword(event.target.value),
                  required: true,
                })}
              />
              {/* {errors.password && (
              <p className="sorgu-form-hata-label">Zorunlu Alan</p>
            )} */}
            </div>
            <input
              type="submit"
              value="Oturum Aç"
              className="sorgu-button"
              disabled={loading}
              style={{
                float: "right",
                marginTop: "30px",
                width: "100%",
                borderRadius: "0px",
                fontSize: "15px",
              }}
              id="goster"
            />
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Login;
