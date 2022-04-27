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
  const [currentDate, setCurrentDate] = useState("");
  const [allYears, setAllYears] = useState([]);
  const [jsonData, setJsonData] = useState([]);

  const setAllyearsArr = (data) => {
    const sortArr = data.sort((a, b) => {
      return b.date < a.date ? 1 : -1;
    });
    const test = [];
    sortArr.forEach((item) => {
      test.push(item.date.split("/")[0]);
    });
    const a = [...new Set(test)];
    function range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((u, idx) => start + idx);
    }
    const continueYears = range(parseInt(a[0]), parseInt(a[a.length - 1]));
    setAllYears(`${continueYears[0]}/01`);
    setAllYears([...continueYears]);
  };
  const getDateData = (data) => {
    const years = currentDate.split("/")[0];
    const months = currentDate.split("/")[1];

    const numMonth = parseInt(months) - 1;

    setJsonData(data);

    const result = data.map((o) => {
      if (o.state) {
        return {
          guaranteed: o.certain,
          date: o.date,
          price: o.price,
          availableVancancy: o.onsell,
          totalVacnacy: o.total,
          status: o.state,
        };
      } else {
        return o;
      }
    });
    const fileterData = result.filter((item) => {
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
  const apiConect = async () => {
    const res = await axios.get("data1.json");
    const { data } = res;
    getDateData(data);
  };
  const oneFuc = async () => {
    const res = await axios.get("data1.json");
    const { data } = res;
    setAllyearsArr(data);
  };
  useEffect(() => {
    oneFuc();
  }, []);

  useEffect(() => {
    apiConect();
  }, [currentDate]);
  return (
    <div className="calendar">
      {allYears.length > 0 && (
        <>
          <Month
            setCurrentDate={setCurrentDate}
            currentDate={currentDate}
            allYears={allYears}
            jsonData={jsonData}
          />

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
        </>
      )}
    </div>
  );
}

export default App;
