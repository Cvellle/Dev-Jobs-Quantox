import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Store } from "../../../store/store";

const DetailsItem = ({ itemProp, darkProp }) => {
  return (
    <div
      className={`details__item  ${
        darkProp ? "details__item--white" : "details__item--black"
      }`}
    >
      <div className="img-container">
        <span
          className="img1"
          style={{
            backgroundColor: itemProp?.logoBackground,
            backgroundImage: "url(" + itemProp?.logo.slice(1) + ")",
          }}
        ></span>
      </div>
      <div>
        <h4
          style={{
            color: !darkProp ? "#fff" : "#000000e6",
          }}
        >
          {itemProp?.company}
        </h4>
        <div>{itemProp?.website.split("://").slice(1)}</div>
      </div>
      <a href={itemProp?.website} target="_blank">
        Company Website
      </a>
    </div>
  );
};

const Details = () => {
  const { state, dispatch } = React.useContext(Store);
  const [item, setItem] = useState();
  const params = useParams();
  let {dark} = state;

  useEffect(() => {
    setItem(state.jobsData[params.id - 1]);
  }, []);

  return (
    <div className="details-wrapper">
      <div
        className={`details  ${
          dark ? "details--white" : "details--black"
        }`}
      >
        <DetailsItem itemProp={item && item} darkProp={dark} />
        <div className="details__header">
          <span>
            {item?.postedAt} . {item?.contract}
          </span>
          <h2  style={{
            color: !dark ? "#fff" : "#000000e6",
          }}>{item?.position}</h2>
          <div>{item?.location}</div>
          <button>Apply Now</button>
        </div>
        <div className="description">{item?.description}</div>
        <div className="requirements">
          <h3>Requirements</h3>
          <p>{item?.requirements.content}</p>
          <ul>
            {item?.requirements.items.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ul>
        </div>
        <div className="role">
          <h3>What You Will Do</h3>
          <p>{item?.role.content}</p>
          <ol>
            {item?.role.items.map((el, i) => (
              <li key={i}>{el}</li>
            ))}
          </ol>
        </div>
      </div>
      <div
        className={`details-footer  ${
          dark ? "details-footer--white" : "details-footer--black"
        }`}
      >
        <div>
          <h2
            style={{
              color: !dark ? "#fff" : "#000000e6",
            }}
          >
            {item?.position}
          </h2>
          <div>{item?.location}</div>
        </div>
        <button>Apply Now</button>
      </div>
    </div>
  );
};

export default Details;
