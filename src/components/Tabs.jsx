import React, { useEffect, useState } from "react";

const Tabs = ({
  number,
  currentPage,
  index,
  setcurrentPage,
  setCurrentDate,
  jsonData,
}) => {
  const [noDataState, setNodataState] = useState(true);
  const handleClick = () => {
    setcurrentPage(index);
    setCurrentDate(number);
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
        <p>
          {number.split("/")[0]} {parseInt(number.split("/")[1])}月
        </p>
        {noDataState && <p className="noData">無出發日</p>}
      </div>
    </div>
  );
};

export default Tabs;
