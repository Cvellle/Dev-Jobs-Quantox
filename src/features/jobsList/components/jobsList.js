import React, { useEffect, useState } from "react";

import { Store } from "../../../store/store";
import { getData } from "../api/getJobs";

const JobsList = () => {
  const { state, dispatch } = React.useContext(Store);

  // useEffect(() => {

  // }, []);

  return (
    <div className="list-wrapper">
      {state.jobsData.map((el) => {
        return <ListItem key={el.id.toString()} elData={el} />;
      })}
    </div>
  );
};
const ListItem = ({ elData }) => {
  console.log(elData);
  return (
    <div className="list-item">
      <div className="img-container">
        <span
          className="img1"
          style={{ backgroundColor: elData.logoBackground, backgroundImage: "url(" + elData.logo + ")"}}
        ></span>
      </div>
      <div>
        {elData.postedAt} . {elData.contract}
      </div>
      <h4>{elData.position}</h4>
      <div>{elData.company}</div>
      <strong>{elData.location}</strong>
    </div>
  );
};

export default JobsList;
