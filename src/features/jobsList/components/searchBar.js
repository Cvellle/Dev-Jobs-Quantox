import React, { useContext, useEffect, useState } from "react";

import { Store } from "../../../store/store";

const SearchBar = () => {
  const { state, dispatch } = useContext(Store);
  const [filtered, setFiltered] = useState([]);
  const [filterBy, setFilterBy] = useState({
    contract: false,
    name: "",
    location: "",
    lastFiltered: "",
  });

  const addFilter = (e) => {
    const current = e.currentTarget;
    let newFilter = current.hasOwnProperty("checked")
      ? current.checked
        ? "Full Time"
        : ""
      : current.value;
    setFilterBy({
      ...filterBy,
      [current.name]: newFilter,
      lastFiltered: current.name,
    });
    return filterBy;
  };

  useEffect(() => {
    dispatch({
      type: "NEW_FILTER",
      payload: {
        filterProp: filterBy?.lastFiltered,
        filterBy:
          filterBy?.lastFiltered &&
          filterBy[filterBy.lastFiltered].toLowerCase(),
      },
    });
  }, [filterBy]);

  useEffect(() => {
    dispatch({
      type: "SET_FILTERED",
    });
  }, [state.filterState.filtered]);

  useEffect(() => {
    console.log(state.filtered);
  }, [state.filtered]);

  return (
    <div className="search-bar">
      <div className="left">
        <div className="name">
          <input placeholder="Filter by name" onInput={addFilter} type="text" name="name" />
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
            Full Time <span className="only">Only</span>
            <span className="checkmark"></span>
          </label>
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
