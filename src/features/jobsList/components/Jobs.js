import React from "react";

import JobsList from "./JobsList";
import SearchBar from "./SearchBar";

const Jobs = () => {  
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
