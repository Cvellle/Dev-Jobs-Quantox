import React, { useEffect } from "react";

import { SET_DARK } from "../../../store/actionTypes";
import { Store } from "../../../store/store";

const Header = () => {
  const { state, dispatch } = React.useContext(Store);
  const {dark} = state;

  const darkToggle = () => {
    dispatch({
      type: SET_DARK,
    });
  };

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
