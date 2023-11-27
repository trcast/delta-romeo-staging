import React from "react";
import drLogo from "../assets/client/dr-logo.svg";
import "../App.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav>
      <Link to="/" className="link-style">
        <img src={drLogo} alt="" />
      </Link>
      <div className="nav-links-container p-semibold">
        <Link
          to="/work"
          className={
            location.pathname === "/work" ? "active-link" : "link-style"
          }
        >
          <p className="hover-underline-animation">Work</p>
        </Link>
        <Link
          to="/about"
          className={
            location.pathname === "/about" ? "active-link" : "link-style"
          }
        >
          <p className="hover-underline-animation">About</p>
        </Link>
        <Link
          to="/contact"
          className={
            location.pathname === "/contact" ? "active-link" : "link-style"
          }
        >
          <p className="hover-underline-animation">Contact</p>
        </Link>
        <Link
          to="/jobs"
          className={
            location.pathname === "/jobs" ? "active-link" : "link-style"
          }
        >
          <p className="hover-underline-animation">Jobs</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
