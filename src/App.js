import React, { useState } from "react";
import Column from "./Column";
import Bar from "./Bar";
import "./App.css";
import * as d3 from "d3";

export default function App() {

  const colors = d3.scaleOrdinal(d3.schemeCategory10);

  function RandomDataCS() {
    const data = ["High", "Medium", "Low", "Minor", "Base"].map((d, i) => {
      return {
        name: d,
        value: Math.random() * 40,
        label: `Label ${i}`,
        color: "#1f78b4"
      };
    });
    return data;
  }

  function RandomDataSS() {
    const data = ["High", "Medium", "Low"].map((d, i) => {
      return {
        name: d,
        value: Math.random() * 40,
        label: `Label ${i}`,
        color: colors(i)
      };
    });
    return data;
  }

  const [dataCs, setDataCs] = useState(RandomDataCS());
  const [dataSs, setDataSs] = useState(RandomDataSS());
  const [open, toggle] = useState(false);

  function handleClick(e) {
    setDataCs(RandomDataCS());
    setDataSs(RandomDataSS());
    if (open) {
      toggle(false);
    } else {
      toggle(true);
    }
  }

  return (
    <div className="App">
      <div className="charts-container">
        <div className="chart-container tsd-chart-container">
          <Column />
        </div>
        <div className="chart-container cs-chart-container">
          <Bar data={dataCs} title="Horisontal Bar"/>
        </div>
        <div className="chart-container ss-chart-container">
          <Bar data={dataSs} title="Horisontal Bar"/>
        </div>
      </div>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}
