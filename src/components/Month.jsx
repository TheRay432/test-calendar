import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
const Month = ({ currentDate, setCurrentDate }) => {
  const dealPrevOrNext = (dealState) => {
    const years = currentDate.split("/")[0];
    const months = currentDate.split("/")[1];
    let numMonth = parseInt(months);
    switch (dealState) {
      case "prev":
        if (numMonth > 1) {
          numMonth -= 1;
        }
        break;
      case "next":
        if (numMonth < 12) {
          numMonth += 1;
        }
        break;
      default:
        break;
    }
    let strMonth = "";
    if (numMonth < 10) {
      strMonth = "0" + numMonth;
    } else {
      strMonth = numMonth;
    }
    setCurrentDate(`${years}/${strMonth}`);
  };
  const handlePrevMonth = () => {
    dealPrevOrNext("prev");
  };
  const handleNextMonth = () => {
    dealPrevOrNext("next");
  };

  return (
    <div className="month">
      <div className="icon" onClick={handlePrevMonth}>
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
