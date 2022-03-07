import React, { useEffect } from "react";
import { getData } from "../features/jobsList/api/getJobs";

export const Store = React.createContext();

const initialState = {
  jobsData: [],
  toFilter: [],
  filtered: [],
  filterState: {
    filterBy: {},
    filtered: [],
  },
  search: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      return { ...state, jobsData: action.payload, toFilter: action.payload };
    case "NEW_FILTER":
      // spread filterBy in state with new values
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
    case "SET_FILTERED":
      const newFilter = () => {
        let filters = state.filterState.filterBy;
        let filteredArray = state.toFilter.filter((job) => {
          // check if filter object keys are single ar multi values
          for (const f in filters) {
            let arrayCheck = f.split(", ").length > 1;
            if (
              filters[f] &&
              !arrayCheck &&
              !job[f].toLowerCase().includes(filters[f].toLowerCase())
            ) {
              return false;
            }

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
    case "SET_SEARCH":
      return { ...state, search: action.payload };
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
