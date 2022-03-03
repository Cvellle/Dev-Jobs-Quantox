import React, { useEffect } from "react";
import { getData } from "../features/jobsList/api/getJobs";

export const Store = React.createContext();

const initialState = {
  jobsData: [],
  toFilter: [],
  filtered: [],
};

const reducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "FETCH":
      return { ...state, jobsData: action.payload, toFilter: action.payload };
    case "FILTER":
      let payloadValue = action.payload.filterBy;
      let filterArray =
        payloadValue.length > 0 ? state.filtered : state.toFilter;
      let returnValue =
        payloadValue.length === 0
          ? {
              ...state,
              filtered: state.toFilter,
            }
          : {
              ...state,
              filtered: filterArray.filter((el, i) => {
                return el[action.payload.filterProp]
                  .toLowerCase()
                  .includes(action.payload.filterBy);
              }),
            };
      return returnValue;
    case "SET_FILTERED":
      return {
        ...state,
        toFilter: action.payload,
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    getData(state, dispatch, "FETCH", "jobsData");
  }, []);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
