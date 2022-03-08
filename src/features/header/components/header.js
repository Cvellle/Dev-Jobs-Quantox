import React, { useEffect } from "react";
import { Store } from "../../../store/store";

const Header = () => {
  const { state, dispatch } = React.useContext(Store);

  const darkToggle = () => {
    dispatch({
      type: "SET_DARK",
    });
  };

  useEffect(() => {
    document.body.style.background = state.dark ? "#f2f2f2" : "black";
    // document.body.setAttribute('data-theme', state.dark ? "dark" : "light");

  }, [state.dark]);

  return (
    <header className="header">
      <div className="wrapper">
        <h1>devjobs</h1>
        <div className="switch-wrapper">
          <span className={state.staticDark ? "img1" : "img2"}></span>
          <label className="switch">
            <input type="checkbox" onInput={darkToggle} />
            <span className="slider round"></span>
          </label>
          <span className={state.staticDark ? "img2" : "img1"}></span>
        </div>
      </div>
    </header>
  );
};

export default Header;
