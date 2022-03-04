import React, { useEffect } from "react";
import { getData } from "../features/jobsList/api/getJobs";

export const Store = React.createContext();

const initialState = {
  jobsData: [],
  toFilter: [],
  filtered: [],
  filterState: {
    filterBy: {
      contract: "",
      name: "",
      location: "",
    },
    filtered: [],
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, jobsData: action.payload, toFilter: action.payload };
    case "FILTER":
      let filterArray =
        state.filtered.length > 0 ? state.filtered : state.toFilter;
      let returnValue =
        action.payload.filterBy.length === 0
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
      const newFilter = () => {
        let filteredArray = state.toFilter.filter((job) => {
          console.log(job);
          if (
            job["contract"] &&
            !job["contract"]
              .toLowerCase()
              .includes(state.filterState.filterBy["contract"])
          ) {
            return false;
          }

          if (
            job["position"] &&
            !job["position"]
              .toLowerCase()
              .includes(state.filterState.filterBy["name"])
          ) {
            console.log(state.filterState.filterBy["name"]);
            return false;
          }

          if (
            job["location"] &&
            !job["location"]
              .toLowerCase()
              .includes(state.filterState.filterBy["location"])
          ) {
            return false;
          }

          return true;
        });

        return filteredArray;
      };

      return {
        ...state,
        filtered: newFilter(),
      };
    case "NEW_FILTER":
      return {
        ...state,
        filterState: {
          ...state.filterState,
          filterBy: {
            ...state.filterState.filterBy,
            [action.payload.filterProp]: action.payload.filterBy,
          },
          filtered: state.filterState.filtered.filter((el, i) => {
            return el[action.payload.filterProp]
              .toLowerCase()
              .includes(action.payload.filterBy);
          }),
        },
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
