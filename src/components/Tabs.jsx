import React, { useEffect } from "react";

const Tabs = ({
  number,
  currentPage,
  index,
  setcurrentPage,
  setCurrentDate,
}) => {
  const handleClick = () => {
    setcurrentPage(index);
    setCurrentDate(number);
  };

  return (
    <div
      key={number}
      onClick={handleClick}
      className={currentPage === index ? "date active" : "date"}
    >
      {number.split("/")[0]} {parseInt(number.split("/")[1])}月
    </div>
  );
};

export default Tabs;
