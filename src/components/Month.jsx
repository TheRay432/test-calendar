import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Tabs from "./Tabs";
const Month = ({ currentDate, setCurrentDate, allYears, jsonData }) => {
  const [yearMonthArr, setYearsMonthArr] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [pages, setPages] = useState([]);

  const handleNextbtn = () => {
    if (currentPage >= yearMonthArr.length) {
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
    const sortArr = jsonData.sort((a, b) => {
      return b.date < a.date ? 1 : -1;
    });
    console.log(sortArr);

    for (let i = 1; i <= 12; i++) {
      if (i < 10) {
        i = "0" + i;
      }
      monthArr.push(i);
    }
    let check = false;
    let lastcheck = false;
    allYears.forEach((item, i) => {
      monthArr.forEach((item2) => {
        if (lastcheck) {
          return;
        } else if (!check) {
          sortArr.some((item3) => {
            if (item3.date.includes(`${item}/${item2}`)) {
              yearMonthArr.push(`${item}/${item2}`);
              check = true;
              return true;
            } else {
              return false;
            }
          });
        } else {
          yearMonthArr.push(`${item}/${item2}`);
          if (jsonData[jsonData.length - 1].date.includes(`${item}/${item2}`)) {
            lastcheck = true;
          }
        }
      });
    });

    const a = [];
    for (let i = 1; i <= yearMonthArr.length; i++) {
      a.push(yearMonthArr[i - 1]);
    }
    setPages([...a]);
    // setCurrentDate(a[0]);
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
                jsonData={jsonData}
              />
            );
          } else {
            return null;
          }
        })}

      <div className="icon rightIcon" onClick={handleNextbtn}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </div>
  );
};

export default Month;
