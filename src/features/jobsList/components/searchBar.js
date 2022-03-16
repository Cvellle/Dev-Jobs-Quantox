import React, { useContext, useState } from "react";
import { useDidUpdate } from "../../../hooks/useDidUpdate";
import {
  NEW_FILTER,
  SET_FILTERED,
  SET_SEARCH,
} from "../../../store/actionTypes";

import { Store } from "../../../store/store";

const SearchBar = () => {
  const { state, dispatch } = useContext(Store);
  const [menuVisible, setMenuVisible] = useState(false);
  const [selected, setSelecetd] = useState("");
  const { dark, filterBy, jobsData } = state;

  // spread store state with new value
  const addFilter = (e) => {
    const current = e.currentTarget;
    // check if the input has checked property
    let newFilter = current.hasOwnProperty("checked")
      ? current.checked
        ? current.value
        : ""
      : current.value;

    dispatch({
      type: NEW_FILTER,
      payload: {
        filterProp: current.name,
        filterBy: newFilter.toLowerCase(),
      },
    });
  };

  // select input function - add value to filterBy store state
  const addSelectFilter = (e) => {
    const current = e.currentTarget;
    let selectedBoolean = current.value.length > 0;
    setSelecetd(selectedBoolean);
    dispatch({
      type: NEW_FILTER,
      payload: {
        filterProp: current.name,
        filterBy: current.value.toLowerCase(),
      },
    });
  };

  // init the search
  const startSearch = () => {
    let allEmpty = Object.values(filterBy).every((el) => el.length === 0);
    if (!allEmpty)
      dispatch({
        type: SET_SEARCH,
        payload: true,
      });
    setMenuVisible(false);
  };

  // mobile menu show/hide
  const menuToggle = () => {
    setMenuVisible(!menuVisible);
  };

  // after filter is changed, change diltered array (in store state)
  useDidUpdate(() => {
    dispatch({
      type: SET_FILTERED,
    });
  }, [filterBy]);

  // select options locations - duplicates removed
  const locationsSet = [...new Set(jobsData.map((job) => job.location))];

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
            onChange={addFilter}
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
            <select
              className={`${!dark ? "dark" : "light"} ${
                selected ? "selected" : ""
              }`}
              onChange={addSelectFilter}
              name="location"
              defaultValue={""}
            >
              <option value="">Filter by location</option>
              {locationsSet.map((location, i) => (
                <option key={i} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <label
            className="full-time"
            style={{
              color: !dark ? "#fff" : "#000000e6",
            }}
          >
            <input
              onChange={addFilter}
              type="checkbox"
              defaultChecked={false}
              name="contract"
              value="Full time"
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
