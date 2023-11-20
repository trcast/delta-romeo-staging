import React from "react";
import drLogo from "../assets/client/dr-logo.svg";
import "../App.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="link-style">
        <img src={drLogo} alt="" />
      </Link>
      <div className="nav-links-container p-semibold">
        <Link to="/work">
          <p className="link-style hover-underline-animation">Work</p>
        </Link>
        <Link to="/about">
          <p className="link-style hover-underline-animation">About</p>
        </Link>
        <Link to="/contact">
          <p className="link-style hover-underline-animation">Contact</p>
        </Link>
        <Link to="/jobs">
          <p className="link-style hover-underline-animation">Jobs</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
