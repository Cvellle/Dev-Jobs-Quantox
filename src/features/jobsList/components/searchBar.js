import React, { useContext, useEffect, useState } from "react";

import { Store } from "../../../store/store";

const SearchBar = () => {
  const { state, dispatch } = useContext(Store);
  const [menuVisible, setMenuVisible] = useState(false);
  const { dark } = state;

  const addFilter = (e) => {
    const current = e.currentTarget;
    let newFilter = current.hasOwnProperty("checked")
      ? current.checked
        ? "Full Time"
        : ""
      : current.value;

    dispatch({
      type: "NEW_FILTER",
      payload: {
        filterProp: current.name,
        filterBy: newFilter.toLowerCase(),
      },
    });
  };

  const startSearch = () => {
    let allEmpty = Object.values(state.filterBy).every((el) => el.length === 0);
    if (!allEmpty)
      dispatch({
        type: "SET_SEARCH",
        payload: true,
      });
    setMenuVisible(false);
  };

  const menuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    dispatch({
      type: "SET_FILTERED",
    });
  }, [state.filterBy]);

  return (
    <div
      className="search-bar"
      style={{
        background: !dark ? "#19202D" : "white",
      }}
    >
      <div
        className="left"
        style={{
          background: !dark ? "#19202D" : "white",
        }}
      >
        <div className="name">
          <input
            style={{
              color: !dark ? "#fff" : "#000000e6",
            }}
            placeholder="Filter by name"
            onInput={addFilter}
            type="text"
            name="position, company"
          />
          <span className="icon1" onClick={menuToggle}></span>
        </div>
      </div>
      <div className={`right ${menuVisible && "right--visible"}`}>
        <div
          className="inner-wrapper"
          style={{
            background: !dark ? "#19202D" : "white",
          }}
        >
          <div className="location">
            <span className="icon2"></span>
            <input
              style={{
                color: !dark ? "#fff" : "#000000e6",
              }}
              onInput={addFilter}
              type="text"
              placeholder="Filter by location"
              name="location"
            />
          </div>
          <label
            className="full-time"
            style={{
              color: !dark ? "#fff" : "#000000e6",
            }}
          >
            <input
              onInput={addFilter}
              type="checkbox"
              defaultChecked={false}
              name="contract"
            />
            <span className="text">Full Time</span>
            <span className="only">Only</span>
            <span className="checkmark"></span>
          </label>
          <button onClick={startSearch}>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
