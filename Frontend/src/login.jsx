import React, { useState } from "react";
import "./loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [dbPassword, setDbPassword] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const isValidate = () => {
    let isValid = true;
    if (userName === "") {
      setUserNameError("Username cannot be left blank");
      isValid = false;
    } else {
      setUserNameError("");
    }
    if (Password === "") {
      setPasswordError("Password cannot be left blank");
      isValid = false;
    } else {
      setPasswordError("");
    }
    return isValid;
  };

  const matchPasswords = async (e) => {
    e.preventDefault();
    if (!isValidate()) {
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getPassword",
        {
          params: {
            user: userName,
            password: Password,
          },
        }
      );
      setFlag(response.data.success);
      console.log(response.data.message);
      if (response.data.success) {
        navigate("/Display");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="login-page">
      <div className="form">
        <form className="login-form">
          <input
            type="text"
            placeholder="username"
            value={userName}
            autoComplete="username"
            onChange={(e) => setUserName(e.target.value)}
          />
          {userNameError && (
            <p className="error" style={{ color: "red" }}>
              {userNameError}
            </p>
          )}
          <input
            type="password"
            placeholder="password"
            value={Password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="error" style={{ color: "red" }}>
              {passwordError}
            </p>
          )}
          <button onClick={matchPasswords}>login</button>
          <p className="message">
            Not registered?{" "}
            <Link to="/UserRegistration" className="link-underline-secondary">
              Registration
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
