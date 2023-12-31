import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import API_URL from "../../apiKey";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  console.log("auth function", authenticateUser);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);

      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  // const handleLoginSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const requestBody = { email, password };

  //   axios
  //     .post(`${API_URL}/auth/login`, requestBody)
  //     .then((response) => {
  //       console.log("JWT token", response.data.authToken);
  //       storeToken(response.data.authToken);
  //       authenticateUser();
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       const errorDescription = error.response.data.message;
  //       setErrorMessage(errorDescription);
  //     });
  // };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className="form">
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
};

export default LoginPage;
