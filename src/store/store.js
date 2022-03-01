import React, { useEffect } from "react";
import { getData } from "../features/jobsList/api/getJobs";

export const Store = React.createContext();

const initialState = {
    jobsData: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_JOBS":
      return { ...state, jobsData: action.payload };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useEffect(() => {
    getData(
      state,
      dispatch,
      "FETCH_JOBS",
      "jobsData"
    );
  }, []);
  const value = { state, dispatch };



  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
