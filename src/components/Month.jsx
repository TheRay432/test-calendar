import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Month = ({ setDate, date, getDateData }) => {
  const handleNextMonth = () => {
    console.log(1);
  };
  return (
    <div className="month">
      <div className="icon">
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div className="date active">
        <h2>2017 5月</h2>
      </div>
      <div className="date">
        <h2>2017 6月</h2>
      </div>
      <div className="date ">
        <h2>2017 7月</h2>
      </div>

      <div className="icon" onClick={handleNextMonth}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Month;
