import React, { useEffect } from "react";

import { Store } from "../../../store/store";
import { getData } from "../api/getJobs";

const JobsList = () => {
  const { state, dispatch } = React.useContext(Store);

  useEffect(() => {
    getData(state, dispatch, "FETCH_JOBS", "jobsData");
  }, []);

  useEffect(() => {}, [state]);

  return (
    <div>
      <MainList passedArray={state.jobsData} />
    </div>
  );
};

const MainList = ({ passedArray }) => {
  let mapped = passedArray.map((el, i) => {
    return <div key={el.id}>{el.company}</div>;
  });
  return mapped;
};

export default JobsList;
