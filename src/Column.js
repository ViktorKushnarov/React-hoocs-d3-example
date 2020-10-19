import React, { useState, useRef } from "react";
import * as d3 from "d3";

function RandomData() {
  const data = ([...Array(10)].map((d, i) => {
    return {
      x: `C. ${i}`,
      y: Math.random() * 40,
      label: `Label ${i}`
    };
  })).sort((a, b) => b.y - a.y);
  return data;
}

function Column() {
  const [data, setData] = useState(RandomData());
  const [open, toggle] = useState(false);

  let container = useRef(null);

  const w = container ? (container.offsetWidth || 900) : 900,
    h = 300,
    cornerRadius = 4,
    margin = {
      top: 40,
      bottom: 40,
      left: 40,
      right: 40
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const xScale = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.5)
    .domain(data.map(d => d.x));

  const yScale = d3.scaleLinear()
    .rangeRound([height, 0])
    .domain([0, d3.max(data, d => d.y)])
    .nice().nice();

  function handleClick(e) {
    setData(RandomData());
    if (open) {
      toggle(false);
    } else {
      toggle(true);
    }
  }

  const backgroundRects = data.map((d, i) => (
    <rect
      key={i}
      className="background-column"
      fill="#f0f1f3"
      x={xScale(d.x)}
      y={0}
      width={xScale.bandwidth()}
      height={height}
    />
  ));

  const rects = data.map((d, i) => (
    <rect
      key={i}
      className="column"
      fill="#ab8b52"
      rx={cornerRadius}
      ry={cornerRadius}
      x={xScale(d.x)}
      y={yScale(d.y)}
      width={xScale.bandwidth()}
      height={height - yScale(d.y)}
    />
  ));

  const axisLeft = yScale.ticks(5).map((d, i) => (
    <g key={i} className="y-tick">
      <line
        style={{ stroke: "#e4e5eb" }}
        y1={yScale(d)}
        y2={yScale(d)}
        x2={width}
      />
      <text style={{ fontSize: 12 }} x={-20} dy=".32em" y={yScale(d)}>
        {d}
      </text>
    </g>
  ));

  const text = data.map((d, i) => (
    <text
      key={i}
      className="labels"
      x={xScale(d.x) + xScale.bandwidth() / 2}
      y={height + 18}
      textAnchor="middle"
    >{d.x}</text>
  ));

  const labels = data.map((d, i) => (
    <text
      key={i}
      className="labels"
      x={xScale(d.x) + xScale.bandwidth() / 2}
      y={height + 32}
      fontSize="0.8em"
      fill="#cccccc"
      textAnchor="middle"
    >{d.label}</text>
  ));

  return (
    <div ref={container} className="chart-wrapper">
      <p>Column chart </p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axisLeft}
          {backgroundRects}
          {rects}
          {text}
          {labels}
        </g>
      </svg>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default Column;
