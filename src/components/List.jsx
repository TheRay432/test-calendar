import React, { useEffect, useState } from "react";
import OneList from "./OneList";

const List = ({
  listMode,
  listNotSameData,
  setPrevState,
  setNextState,
  setHidden,
  setCurrentPage,
  hidden,
  currentPage,
  prevState,
  nextState,
}) => {
  const handleNextBtn = () => {
    setHidden(!hidden);
    setCurrentPage((prevData) => prevData + 1);
  };
  const handlePrevBtn = () => {
    setCurrentPage((prevData) => prevData - 1);
    setHidden(!hidden);
  };
  useEffect(() => {
    if (currentPage !== 1) {
      setPrevState(false);
    } else {
      setPrevState(true);
    }
    if (currentPage === Math.ceil(listNotSameData.length / 8)) {
      setNextState(false);
    } else {
      setNextState(true);
    }
  }, [currentPage]);
  return (
    <div className={listMode ? "" : "d-no"}>
      <div className="list" style={{ minHeight: "496px" }}>
        {listNotSameData.length > 0 &&
          listNotSameData.map((item, i) => {
            if (i > 7) {
              return <OneList hidden={hidden} item={item} key={item.date} />;
            } else {
              return <OneList hidden={!hidden} item={item} key={item.date} />;
            }
          })}
        {listNotSameData.length === 0 && (
          <>
            <ul className="ulDiv">
              <li className="li-noData">本月無出發行程</li>
            </ul>
          </>
        )}
      </div>
      {listNotSameData.length > 8 && (
        <div className="pagecounter">
          <a
            href="javescript:;"
            className={prevState ? "previus v-hide" : "previus"}
            onClick={handlePrevBtn}
          >
            <span className="arrow-gl"></span>
            上一頁
          </a>
          <div className="txt-center">
            <span className="currpage">{currentPage}</span>
            <span className="bold">/</span>
            <span className="totalpage">
              {Math.ceil(listNotSameData.length / 8)}
            </span>
          </div>
          <a
            href="javescript:;"
            className={nextState ? "nextpage" : "nextpage v-hide"}
            onClick={handleNextBtn}
          >
            下一頁
            <span className="arrow-gr"></span>
          </a>
        </div>
      )}
    </div>
  );
};

export default List;
