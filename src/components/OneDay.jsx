import React, { useEffect, useState } from "react";

const OneDay = ({ item, index, setDivActive, divActive }) => {
  const [divState, setDivState] = useState("");
  const handClick = () => {
    if (JSON.stringify(item) !== "{}") {
      setDivActive({ ...divActive, index: index, state: true });
    }
  };
  useEffect(() => {
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
  }, [item.date]);
  return (
    <div
      className={
        JSON.stringify(item) !== "{}" &&
        divActive.index === index &&
        divActive.state
          ? "divFlex active"
          : "divFlex"
      }
      onClick={() => handClick()}
    >
      <p className="number">{index + 1}</p>

      {JSON.stringify(item) !== "{}" && (
        <>
          {item.guaranteed && <span className="tip">成行</span>}
          <section>
            <span className={divState}>{item.status}</span>
            <span>可賣:{item.availableVancancy}</span>
            <span>席次:{item.totalVacnacy}</span>
            <span className="red">${item.price.toLocaleString()}</span>
          </section>
        </>
      )}
    </div>
  );
};

export default OneDay;
