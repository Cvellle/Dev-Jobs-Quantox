import React, { useContext, useEffect, useState } from "react";

import { Store } from "../../../store/store";

const SearchBar = () => {
  const { state, dispatch } = useContext(Store);
  
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
    dispatch({
      type: "SET_SEARCH",
      payload: true
    });
  };

  useEffect(() => {
    dispatch({
      type: "SET_FILTERED",
    });
  }, [state.filterState.filtered]);

  return (
    <div className="search-bar">
      <div className="left">
        <div className="name">
          <input
            placeholder="Filter by name"
            onInput={addFilter}
            type="text"
            name="position, company"
          />
          <span className="icon1"></span>
        </div>
      </div>
      <div className="right">
        <div className="inner-wrapper">
          <div className="location">
            <span className="icon2"></span>
            <input
              onInput={addFilter}
              type="text"
              placeholder="Filter by location"
              name="location"
            />
          </div>
          <label className="full-time">
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
