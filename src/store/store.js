import React, { useEffect } from "react";
import { getData } from "../features/jobsList/api/getJobs";

export const Store = React.createContext();

const initialState = {
  jobsData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, jobsData: action.payload };
    case "FILTER":
      return {
        ...state,
        jobsData: state.jobsdata.filter(
          (el, i) => el[action.payload.filterProp] !== action.payload.filterBy
        ),
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
