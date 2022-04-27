import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Tabs from "./Tabs";
const Month = ({ currentDate, setCurrentDate, allYears }) => {
  const [yearMonthArr, setYearsMonthArr] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(3);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pages, setPages] = useState([]);
  // const dealPrevOrNext = (dealState) => {
  //   const years = currentDate.split("/")[0];
  //   const months = currentDate.split("/")[1];
  //   let numMonth = parseInt(months);
  //   let numYears = parseInt(years);
  //   switch (dealState) {
  //     case "prev":
  //       if (numMonth > 1) {
  //         numMonth -= 1;
  //       } else {
  //         numYears -= 1;
  //         numMonth = 12;
  //       }
  //       break;
  //     case "next":
  //       if (numMonth < 12) {
  //         numMonth += 1;
  //       } else {
  //         numYears += 1;
  //         numMonth = 1;
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   let strMonth = "";
  //   if (numMonth < 10) {
  //     strMonth = "0" + numMonth;
  //   } else {
  //     strMonth = numMonth;
  //   }
  //   setCurrentDate(`${numYears}/${strMonth}`);
  // };
  // const handlePrevMonth = () => {
  //   dealPrevOrNext("prev");
  // };
  // const handleNextMonth = () => {
  //   dealPrevOrNext("next");
  // };
  const handleNextbtn = () => {
    if (currentPage >= 72) {
      return;
    }
    setCurrentDate(pages[currentPage]);
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    if (currentPage <= 1) {
      return;
    }
    setCurrentDate(pages[currentPage - 2]);
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  useEffect(() => {
    const monthArr = [];

    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      monthArr.push(i);
    }
    allYears.forEach((item) => {
      monthArr.map((item2) => {
        yearMonthArr.push(`${item}/${item2}`);
      });
    });
    console.log(yearMonthArr);
    const a = [];
    for (let i = 1; i <= yearMonthArr.length; i++) {
      a.push(yearMonthArr[i - 1]);
    }
    setPages([...a]);
    setCurrentDate(a[0]);
  }, []);

  return (
    <div className="month">
      <div className="icon" onClick={handlePrevbtn}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      {pages.length > 0 &&
        pages.map((number, i) => {
          if (i + 1 < maxPageNumberLimit + 1 && i + 1 > minPageNumberLimit) {
            return (
              <Tabs
                number={number}
                key={number}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
                index={i + 1}
                setCurrentDate={setCurrentDate}
              />
            );
          } else {
            return null;
          }
        })}

      <div className="icon" onClick={handleNextbtn}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Month;
