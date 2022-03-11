import React, { useEffect } from "react";

import { Store } from "../../../store/store";
import JobsList from "./JobsList";
import SearchBar from "./SearchBar";

const Jobs = () => {
  const { state, dispatch } = React.useContext(Store);
  
  return (
    <div className="jobs">
      <div className="wrapper">
        <SearchBar/>
        <JobsList />
      </div>
    </div>
  );
};

export default Jobs;
