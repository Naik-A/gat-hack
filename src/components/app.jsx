// src/components/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Main from "../mainPage/Main.jsx"; 
import AboutUs from "./AboutUs.jsx";
import MobileWarning from "./MobileWarning.jsx";
import "../styles.css"; 

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth <= 700;
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Removed unused routes for AnalyseImage and GenerateCaption */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
