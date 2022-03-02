import React, { useEffect } from "react";

import { Store } from "../../../store/store";
import JobsList from "./jobsList";

const Jobs = () => {
  const { state, dispatch } = React.useContext(Store);

  return (
    <div className="jobs">
      <div className="wrapper">
        <div>
          <div>
            <span></span>
            <input type="text" />
          </div>
          <div>
            <span></span>
            <input type="text" />
          </div>
          <div>
            <label className="container">
              Full Time Only
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <button>Search</button>
          </div>
        </div>
        <JobsList />
      </div>
    </div>
  );
};

export default Jobs;
