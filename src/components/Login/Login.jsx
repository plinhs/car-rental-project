import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {

    console.log(email);  
    console.log(password);  

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const user = response.data.user;
      console.log(response);  
      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("user", JSON.stringify(user)); 
        navigate("/");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); 
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={() => handleSubmit()}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <Link to={"/signup"}> 
          <p> Don't have an account? Sign up </p>
        </Link>
        {error && <div className="error">{error}</div>}
        <button className="login-btn" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
