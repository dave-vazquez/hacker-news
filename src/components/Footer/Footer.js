import "./footer.scss";

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <p>Applications are open for YC Winter 2021</p>
      <nav aria-label="footer navigation">
        <Link to="/guidelines">Guidelines |</Link>
        <Link to="/faq"> FAQ |</Link>
        <Link to="/support"> Support |</Link>
        <Link to="/api"> API |</Link>
        <Link to="/security"> Security |</Link>
        <Link to="/lists"> Lists |</Link>
        <Link to="/bookmarket"> Bookmarket |</Link>
        <Link to="/legal"> Legal |</Link>
        <Link to="/apply"> Apply to YC |</Link>
        <Link to="/contact"> Contact</Link>
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" />
      </form>
    </footer>
  );
};

export default Footer;
