import React, { useRef } from "react";
import * as d3 from "d3";

function Bar(props) {
  const data = props.data;

  let container = useRef(null);

  const w = container ? (container.offsetWidth || 450) : 450,
    h = 250,
    cornerRadius = 4,
    margin = {
      top: 5,
      bottom: 30,
      left: 60,
      right: 20
    };

  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const yScale = d3.scaleBand()
    .rangeRound([height, 0])
    .padding(0.3)
    .domain(data.map(d => d.name));

  const xScale = d3.scaleLinear()
    .rangeRound([0, width])
    .domain([0, d3.max(data, d => d.value)])
    .nice().nice();

  const rects = data.map((d, i) => (
    <rect
      key={i}
      className="column"
      fill={d.color || "#1f78b4"}
      rx={cornerRadius}
      ry={cornerRadius}
      // x={xScale(d.value)}
      y={yScale(d.name)}
      width={xScale(d.value)}
      height={yScale.bandwidth()}
    />
  ));

  const axisBottom = xScale.ticks(5).map((d, i) => (
    <g key={i} className="x-tick">
      <line
        style={{ stroke: "#e4e5eb" }}
        x1={xScale(d)}
        x2={xScale(d)}
        y2={height}
      />
      <text style={{ fontSize: 12, textAnchor: "middle" }} y={height + 12} dy=".32em" x={xScale(d)}>
        {d}
      </text>
    </g>
  ));

  const text = data.map((d, i) => (
    <text
      key={i}
      className="labels"
      x={-10}
      y={yScale(d.name) + yScale.bandwidth() / 2}
      textAnchor="end"
      alignmentBaseline="middle"
    >{d.name}</text>
  ));

  return (
    <div ref={container} className="chart-wrapper">
      <p>{props.title}</p>
      <svg width={w} height={h}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {axisBottom}
          {rects}
          {text}
        </g>
      </svg>
    </div>
  );
}

export default Bar;
