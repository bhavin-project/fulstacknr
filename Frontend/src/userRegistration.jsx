import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [matchPasswordError, setMatchPasswordError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (userName === "") {
      setUserNameError("Username is required");
      isValid = false;
    } else {
      setUserNameError("");
    }

    if (email === "") {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (password === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (confirmPassword === "") {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }
    if (confirmPassword !== "" && password !== confirmPassword) {
      setMatchPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setMatchPasswordError("");
    }

    return isValid;
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const userData = {
      user: userName,
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/registerUser",
        userData
      );
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <form onSubmit={handleClick}>
      <div className="card" style={{ width: "25rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center">User Registration</h5>
          <div className="form-group">
            <label>UserName</label>
            <input
              type="text"
              className="form-control"
              id="userName"
              aria-describedby="emailHelp"
              placeholder="Enter Username"
              value={userName}
              onChange={handleUserNameChange}
            />
            {userNameError && (
              <div style={{ color: "red" }}>{userNameError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && <div style={{ color: "red" }}>{emailError}</div>}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {confirmPasswordError && (
              <div style={{ color: "red" }}>{confirmPasswordError}</div>
            )}
            {matchPasswordError && (
              <div style={{ color: "red" }}>{matchPasswordError}</div>
            )}
          </div>
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label">Check me out</label>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!isChecked}
            >
              Submit
            </button>
            &nbsp;&nbsp;
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserRegistration;
