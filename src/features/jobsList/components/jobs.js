import React from "react";

import JobsList from "./jobsList";
import SearchBar from "./searchBar";

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
