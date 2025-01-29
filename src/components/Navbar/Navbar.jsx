import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ language, handleLanguageChange }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-brand">CAR RENTAL</span>
      </div>
      <div className="navbar-right">
        <Link to="/login">
          <button className="navbar-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-button">Sign Up</button>
        </Link>


      </div>
    </nav>
  );
};

export default Navbar;

