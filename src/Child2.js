import React, { Component } from 'react';
import * as d3 from "d3";

class Child2 extends Component {

  componentDidUpdate() {
    console.log("c1")
    console.log(this.props.data[0])
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 300;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data;

    const svg = d3.select(".child2Svg").attr("width", width).attr("height", height);

    const innerChart = svg.select(".child2Graph").attr("transform", `translate(${margin.left}, ${margin.top})`);

    var avgTipByDay = [
      { day: "Sat", mean: d3.mean(data.filter(d => d.day === "Sat"), d => d.tip)},
      { day: "Sun", mean: d3.mean(data.filter(d => d.day === "Sun"), d => d.tip)},
      { day: "Mon", mean: d3.mean(data.filter(d => d.day === "Mon"), d => d.tip)},
      { day: "Tue", mean: d3.mean(data.filter(d => d.day === "Tue"), d => d.tip)},
      { day: "Wed", mean: d3.mean(data.filter(d => d.day === "Wed"), d => d.tip)},
      { day: "Thur", mean: d3.mean(data.filter(d => d.day === "Thur"), d => d.tip)},
      { day: "Fri", mean: d3.mean(data.filter(d => d.day === "Fri"), d => d.tip)}
    ];
    
    
    avgTipByDay = avgTipByDay.filter(d => d.mean > 0)
    avgTipByDay.sort(function (b, a) {
      return a.mean - b.mean;
    });

    // X axis
    var x = d3.scaleBand()
      .range([0, innerWidth])
      .domain(avgTipByDay.map(function (d) { return d.day; }))
      .padding(0.2);

    innerChart.append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end");


    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(avgTipByDay, d => d.mean)])
      .range([innerHeight, 0]);
    innerChart.append("g").call(d3.axisLeft(y));

    // Bars
    innerChart.selectAll("bar")
      .data(avgTipByDay)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.day); })
      .attr("y", function (d) { return y(d.mean); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return innerHeight - y(d.mean); })
      .attr("fill", "#69b3a2")

    // X axis
    innerChart.append("text")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 15)
      .text("Day");

    // Y axis
    innerChart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -2*margin.left / 3)
      .text("Average Tip");

    // title
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .text("Average Tip by Day");

    // box
    svg.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", width)
      .attr("height", height)
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("fill", "none");

  }

  render() {
    return (
      <svg className="child2Svg">
        <g className="child2Graph"></g>
      </svg>
    );
  }
}

export default Child2;