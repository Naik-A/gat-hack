// src/mainPage/Main.jsx
import React from "react";
import "../styles.css";
import Uploader from "./Uploader";
import RandomIcons from "../RandomIcons";

function Main() {
  return (
    <div className="Main">
      <RandomIcons />
      <div className="content-wrapper">
        <div className="text-container">
          <h1 className="display-4 fst-italic">
            Your Image, Your Rights: Know What You're Sharing.
          </h1>
          <p className="lead my-3">
            Worried about privacy violations? Let our scanning technology identify
            potential ethical issues in your images.
          </p>
        </div>
        <div className="uploader-container">
          <Uploader />
        </div>
      </div>
    </div>
  );
}

export default Main;
