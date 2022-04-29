import React, { useEffect, useState } from "react";
import OneDay from "./OneDay";

const Days = ({ prevArr, nowArr, nextArr, listMode }) => {
  const [divActive, setDivActive] = useState({ index: 0, state: false });

  return (
    <div className={listMode ? "days d-no" : "days"}>
      {/*當周上個月佔幾天 */}
      {prevArr &&
        prevArr.map((item) => <div className="prev-date" key={item}></div>)}
      {/*本月的天數*/}
      {nowArr &&
        nowArr.map((item, i) => (
          <OneDay
            item={item}
            key={i + 1}
            index={i}
            setDivActive={setDivActive}
            divActive={divActive}
          />
        ))}
      {/*當周下個月的天數*/}
      {nextArr &&
        nextArr.map((item) => <div className="next-date" key={item}></div>)}
    </div>
  );
};

export default Days;
