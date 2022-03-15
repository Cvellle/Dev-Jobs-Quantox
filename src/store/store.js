import React, { useEffect } from "react";

import { FETCH, NEW_FILTER, SET_DARK, SET_FILTERED, SET_SEARCH } from "./actionTypes";
import { getData } from "./api/getJobs";

export const Store = React.createContext();

const initialState = {
  jobsData: [],
  toFilter: [],
  filtered: [],
  filterBy: {},
  search: false,
  dark: window.matchMedia("(prefers-color-scheme: dark)"),
  staticDark: window.matchMedia("(prefers-color-scheme: dark)"),
};

const reducer = (state, action) => {
  switch (action.type) {
    case FETCH:
      return { ...state, jobsData: action.payload, toFilter: action.payload };
    case NEW_FILTER:
      // spread filterBy in state with new values
      return {
        ...state,
        filterBy: {
          ...state.filterBy,
          [action.payload.filterProp]: action.payload.filterBy,
        },
      };
    case SET_FILTERED:
      const newFilter = () => {
        let filters = state.filterBy;
        let filteredArray = state.toFilter.filter((job) => {
          // check if filter object keys are single ar multi values
          for (const f in filters) {
            let arrayCheck = f.split(", ").length > 1;
            // single filter inputs
            if (
              filters[f] &&
              !arrayCheck &&
              !job[f].toLowerCase().includes(filters[f].toLowerCase())
            ) {
              return false;
            }
            // multi filter input
            if (filters[f] && arrayCheck) {
              let matchArray = f.split(", ");
              let matchBoolean = matchArray.some((someEl) =>
                job[someEl].toLowerCase().includes(filters[f].toLowerCase())
              );
              if (!matchBoolean) {
                return false;
              }
            }
          }
          return true;
        });

        return filteredArray;
      };

      return {
        ...state,
        filtered: newFilter(),
      };
    case SET_SEARCH:
      return { ...state, search: action.payload };
    case SET_DARK:
      return {
        ...state,
        dark: !state.dark,
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    getData(state, dispatch, FETCH);
  }, []);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
