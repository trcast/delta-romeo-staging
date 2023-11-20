import React from "react";
import logo from "../assets/client/dr-logo.svg";
import address from "../assets/social/address.svg";
import instagram from "../assets/social/instagram.svg";
import twitter from "../assets/social/twitter.svg";
import linkedin from "../assets/social/linkedin.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <section className="footer-global-container">
      <div className="footer-info-container">
        <Link to="/" className="link-style">
          <img src={logo} alt="" />
        </Link>
        <div className="footer-address-container">
          <p className="white">Delta Romeo LLC</p>
          <img src={address} alt="" />
        </div>
        <p className="gray">© 2023 Delta Romeo LLC</p>
      </div>
      <div className="footer-socials-container">
        <img src={twitter} alt="" />
        <img src={instagram} alt="" />
        <img src={linkedin} alt="" />
      </div>
    </section>
  );
};

export default Footer;
