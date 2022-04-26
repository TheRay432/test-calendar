import axios from "axios";
import React, { useEffect } from "react";

const Days = ({ prevArr, nowArr, nextArr }) => {
  const getData = async () => {
    const res = await axios.get("data1.json");
    const { data } = res;
    const a = data.sort(function (a, b) {
      return b.date < a.date ? 1 : -1;
    });
    console.log(a);
  };
  useEffect(() => {
    /*   getData(); */
  }, []);
  return (
    <div className="days">
      {prevArr &&
        prevArr.map((item) => (
          <div className="prev-date" key={item}>
            <p></p>
          </div>
        ))}
      {nowArr &&
        nowArr.map((item, i) => (
          <div key={i + 1} className="divFlex">
            <p>{i + 1}</p>
            {JSON.stringify(item) !== "{}" && (
              <>
                <p>金額:{item.price}</p>
                <p>可賣:{item.availableVancancy}</p>
                <p>團位:{item.totalVacnacy}</p>
                <p>{item.status}</p>
              </>
            )}
          </div>
        ))}
      {nextArr &&
        nextArr.map((item) => (
          <div className="next-date" key={item}>
            <p></p>
          </div>
        ))}
    </div>
  );
};

export default Days;
