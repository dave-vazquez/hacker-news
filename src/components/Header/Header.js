import "./header.scss";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import y18 from "../../assets/y18.gif";

const Header = () => {
  return (
    <header className="main">
      <nav>
        <Link to="/">
          <img id="y18-logo" src={y18} alt="y combinator" />
        </Link>
        <div className="links">
          <Link to="/stories/top/page/0" id="hacker-news"> Hacker News </Link>
          <Link to="/welcome"> welcome </Link>|
          <NavLink to="/stories/new/page/0" activeClassName="active"> new </NavLink>|
          <NavLink to="/threads"> threads </NavLink>|
          <NavLink to="/past"> past </NavLink>|
          <NavLink to="/comments"> comments </NavLink>|
          <NavLink to="/ask"> ask </NavLink>|
          <NavLink to="/show"> show </NavLink>|
          <NavLink to="/jobs"> jobs </NavLink>|
          <NavLink to="/submit"> submit </NavLink>
        </div>
        <div className="user">
          <Link to="/" id="user-link"> user_name (1) |</Link>
          <span> logout</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
