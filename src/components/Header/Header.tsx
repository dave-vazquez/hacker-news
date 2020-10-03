import "./header.scss";

import React from "react";
import { Link, NavLink } from "react-router-dom";
import hackernews from "../../assets/hackernews-logo.png";

const Header: React.FC = () => {
  return (
    <header id="main">
      <nav aria-label="site-wide">
        <Link to="/">
          <img
            id="hacker-news-logo"
            src={hackernews}
            alt="hacker news logo"
          />
        </Link>
        <div>
          <h1>
            <Link to="/stories/top/page/0" id="hacker-news">
              {" "}
              Hacker News{" "}
            </Link>
          </h1>
          <NavLink to="/stories/new/page/0" activeClassName="active">
            {" "}
            new{" "}
          </NavLink>
          |<NavLink to="/threads"> threads </NavLink>|
          <NavLink to="/past"> past </NavLink>|
          <NavLink to="/comments"> comments </NavLink>|
          <NavLink to="/ask"> ask </NavLink>|
          <NavLink to="/show"> show </NavLink>|
          <NavLink to="/jobs"> jobs </NavLink>|
          <NavLink to="/submit"> submit </NavLink>
        </div>
        <div id="user-logout">
          <Link to="/"> user_name (1) |</Link>
          <span> logout</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
