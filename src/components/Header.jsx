// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import RandomIcons from "../RandomIcons";

function Header() {
  return (
    <header
      className="d-flex flex-wrap align-items-center justify-content-between py-3 mb-3 Header"
      style={{ height: "80px" }}
    >
      <RandomIcons />
      <div
        className="col-md-5 mb-2 mb-md-0 text-center d-flex align-items-center"
        style={{ marginLeft: "10px", marginRight: "10px" }} // Reduced margin
      >
        <h1
          className="text-white"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "2rem",
            margin: 0,
          }}
        >
          SnapSafe
        </h1>
      </div>
      <ul
        className="nav col-9 col-md-auto mb-2 justify-content-end mb-md-0 d-flex align-items-center"
        style={{ marginRight: "10px" }} // Reduced margin
      >
        <li className="nav-item">
          <Link
            to="/"
            className="nav-link px-2 text-white"
            style={{ fontSize: "1.5rem" }}
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/about"
            className="nav-link px-2 text-white"
            style={{ fontSize: "1.5rem" }}
          >
            About Us
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
