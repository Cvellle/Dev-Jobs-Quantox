import React, { useEffect } from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <h1>devjobs</h1>
        <div className="switch-wrapper">
          <span className="img1"></span>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <span className="img2"></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
