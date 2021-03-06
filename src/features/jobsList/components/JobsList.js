import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Store } from "../../../store/store";

const JobsList = () => {
  const { state, dispatch } = React.useContext(Store);
  const [sliceList, setSliceList] = useState(12);
  const {jobsData, filtered, search, dark} = state;
  // increment slice of jobs array
  const loadMore = () => {
    setSliceList(sliceList + 6);
  };

  return (
    <div className="list-wrapper">
      {(!search ? jobsData : filtered)
        .slice(0, sliceList)
        .map((el) => {
          return (
            <ListItem
              key={el.id.toString()}
              elData={el}
              darkProp={dark}
            />
          );
        })}
      <div className="more">
        {/* check if the search has started, and filetered length */}
        {((
          (filtered.length === 0 && !search) ||
          filtered.length === jobsData.length)) &&
          sliceList < jobsData.length && (
            <button onClick={loadMore}>Load More</button>
          )}
      </div>
    </div>
  );
};

const ListItem = ({ elData, darkProp }) => {
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate(`/item/${elData.id}`);
  };
  return (
    <div
      className="list-item"
      onClick={goToDetails}
      style={{
        background: !darkProp ? "#19202D" : "white",
      }}
    >
      <div className="img-container">
        <span
          className="img1"
          style={{
            backgroundColor: elData.logoBackground,
            backgroundImage: "url(" + elData.logo + ")",
          }}
        ></span>
      </div>
      <div>
        {elData.postedAt} . {elData.contract}
      </div>
      <h4
        style={{
          color: !darkProp ? "#fff" : "#000000e6",
        }}
      >
        {elData.position}
      </h4>
      <div>{elData.company}</div>
      <strong>{elData.location}</strong>
    </div>
  );
};

export default JobsList;
