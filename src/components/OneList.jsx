import React, { useEffect, useState } from "react";

const OneList = ({ item, hidden, active, setActive }) => {
  const [week, setWeek] = useState([
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ]);
  const [date, setDate] = useState("");
  const [divState, setDivState] = useState("");
  const [test, setTest] = useState(null);
  const [border, setBorder] = useState("");
  const handleActive = () => {
    setActive({ ...active, date: item.date, state: true });
  };

  useEffect(() => {
    setDate(new Date(item.date));
    if (JSON.stringify(item) !== "{}") {
      switch (item.status) {
        case "預定":
          setDivState("order");
          break;
        case "後補":
          setDivState("alternate");
          break;
        case "額滿":
          setDivState("full");
          break;
        case "報名":
          setDivState("order");
          break;
        default:
          setDivState("");
          break;
      }
    } else {
      setDivState("");
    }
    // setTest(hidden);
  }, []);
  useEffect(() => {
    if (active.date === item.date) {
      setBorder("list-active");
    } else {
      setBorder("");
    }
  }, [active]);
  return (
    <div>
      {date && (
        <div
          className={hidden ? `oneList hidden ${border}` : `oneList ${border}`}
          onClick={handleActive}
        >
          <div className="li-left">
            {parseInt(item.date.split("/")[2])}
            <span className="li-weekday">{week[date.getDay()]}</span>
          </div>
          <div className="li-middle">
            <div className="lbcontent">
              <span>可賣:{item.availableVancancy}</span>
              <span>席次:{item.totalVacnacy}</span>
            </div>
            {item.guaranteed && <div className="lig_gpcl">成行</div>}
          </div>
          <div className="li-right">
            <div className={`price-label ${divState}`}>{item.status}</div>
            <span className="price">${item.price.toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneList;
