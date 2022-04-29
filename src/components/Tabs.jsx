import React, { useEffect, useState } from "react";

const Tabs = ({
  number,
  currentPage,
  index,
  setcurrentPage,
  setCurrentDate,
  jsonData,
  setPrevState,
  setNextState,
  setHidden,
  setCurrentPage,
}) => {
  const [noDataState, setNodataState] = useState(true);
  const handleClick = () => {
    setcurrentPage(index);
    setCurrentDate(number);
    setPrevState(true);
    setNextState(true);
    setHidden(true);
    setCurrentPage(1);
  };
  useEffect(() => {
    jsonData.forEach((item) => {
      if (item.date.includes(number)) {
        setNodataState(false);
      }
    });
  }, []);
  return (
    <div
      key={number}
      onClick={handleClick}
      className={currentPage === index ? "date active" : "date"}
    >
      <div className="tabs">
        <span>
          {number.split("/")[0]} {parseInt(number.split("/")[1])}月
        </span>
        {noDataState && <span className="noData">無出發日</span>}
      </div>
    </div>
  );
};

export default Tabs;
