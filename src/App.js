import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/all.css";
import Days from "./components/Days";
import Month from "./components/Month";
function App() {
  const [myDate, setMyDate] = useState(new Date());
  const [prevArr, setPrevArr] = useState(null);
  const [nowArr, setNowvArr] = useState(null);
  const [nextArr, setNextArr] = useState(null);
  const [currentDate, setCurrentDate] = useState("2017/05");

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
  const getDateData = async () => {
    const years = currentDate.split("/")[0];
    const months = currentDate.split("/")[1];

    const numMonth = parseInt(months) - 1;
    const res = await axios.get("data1.json");
    const data = res.data;
    const fileterData = data.filter((item) => {
      return item.date.includes(currentDate);
    });
    const removeDuplicates = (originalArray, p) => {
      const newArray = [];
      const lookupObject = {};

      for (let i in originalArray) {
        lookupObject[originalArray[i][p]] = originalArray[i];
      }

      for (let i in lookupObject) {
        newArray.push(lookupObject[i]);
      }
      return newArray;
    };
    const notSameFilterData = removeDuplicates(fileterData, "date");

    const pArr = [];
    const lArr = [];
    const xArr = [];
    myDate.setFullYear(years);
    myDate.setMonth(numMonth);
    myDate.setDate(1);

    const lastDay = new Date(
      myDate.getFullYear(),
      myDate.getMonth() + 1,
      0
    ).getDate();
    const prevDay = new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      0
    ).getDate();
    const firstIndex = myDate.getDay();
    const lastIndex = new Date(
      myDate.getFullYear(),
      myDate.getMonth() + 1,
      0
    ).getDay();
    const nextDays = 7 - lastIndex - 1;
    for (let x = firstIndex; x > 0; x--) {
      pArr.push(prevDay - x + 1);
    }
    setPrevArr([...pArr]);

    for (let i = 1; i <= lastDay; i++) {
      notSameFilterData.forEach((item) => {
        if (i === parseInt(item.date.split("/")[2])) {
          lArr.push(item);
        }
      });
      if (!lArr[i - 1]) {
        lArr.push({});
      }
    }
    setNowvArr([...lArr]);

    for (let j = 1; j <= nextDays; j++) {
      xArr.push(j);
    }
    setNextArr([...xArr]);
  };

  useEffect(() => {
    getDateData();
  }, [currentDate]);
  return (
    <div className="calendar">
      <Month setCurrentDate={setCurrentDate} currentDate={currentDate} />

      <div className="weekdays">
        <div>星期日</div>
        <div>星期一</div>
        <div>星期二</div>
        <div>星期三</div>
        <div>星期四</div>
        <div>星期五</div>
        <div>星期六</div>
      </div>
      <Days prevArr={prevArr} nowArr={nowArr} nextArr={nextArr} />
    </div>
  );
}

export default App;
