import React from "react";
import arrowLg from "../assets/client/arrow-lg.svg";
import { Link } from "react-router-dom";

const SectionHeaderLink = ({ title, link }) => {
  return (
    <header className="header-link">
      <Link to={`/${link}`} className="link-style">
        <div className="header-link-content hover-right-position">
          <h1>{title}</h1>
          <img src={arrowLg} alt="" />
        </div>
      </Link>
    </header>
  );
};

export default SectionHeaderLink;
