import React from "react";
import "../styles.css"; // Ensure the correct path for the stylesheet

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="top-section">
        <div className="about-us">
          <h1>About Us</h1>
          <p>
            Welcome to SnapSafe! We are dedicated to empowering individuals to
            protect their image rights in an increasingly digital world. Our
            advanced scanning technology analyzes your images for potential
            ethical issues, ensuring that your photos tell the story you intend
            without compromising your privacy.
          </p>
        </div>

        <div className="our-mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a seamless and secure platform for managing
            and understanding the content you share. Whether you're a casual user
            or a professional photographer, SnapSafe is here to help you make
            informed decisions about your visual content.
          </p>
        </div>
      </div>

      <div className="our-team">
        <h2>Our Team</h2>
        <p>
          Our team comprises 4 students from RVCE: Aayushh K P Naik, Aditya
          Ranjan, Diptanshu Kumar, and Pranav V Jambur. Together, we strive to
          innovate and create tools that respect and uphold individual rights in
          the digital landscape.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
