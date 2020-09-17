import "./footer.scss";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Applications are open for YC Winter 2021</p>
      <nav>
        <Link to="/">Guidelines |</Link>
        <Link to="/"> FAQ |</Link>
        <Link to="/"> Support |</Link>
        <Link to="/"> API |</Link>
        <Link to="/"> Security |</Link>
        <Link to="/"> Lists |</Link>
        <Link to="/"> Bookmarket |</Link>
        <Link to="/"> Legal |</Link>
        <Link to="/"> Apply to YC |</Link>
        <Link to="/"> Contact</Link>
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" />
      </form>
    </footer>
  );
};

export default Footer;
