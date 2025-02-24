import React, { Component } from 'react';
import * as d3 from "d3";

class Child1 extends Component {
  
  componentDidUpdate() {
    console.log("c1")
    console.log(this.props.data[0])
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 600;
    const height = 300;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const data = this.props.data;

    const svg = d3.select(".child1Svg").attr("width", width).attr("height", height);

    const innerChart = svg.select(".child1Graph").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.total_bill)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.tip)]).range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    innerChart.selectAll(".x-axis").data([null])
      .join("g").attr('class', 'x-axis')
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(xAxis);

    innerChart.selectAll(".y-axis").data([null])
      .join("g").attr('class', 'y-axis')
      .call(yAxis);

    innerChart.selectAll("circle").data(data).join("circle").attr("r", 3).attr("fill", "#69b3a2")
      .attr("cx", d => xScale(d.total_bill)).attr("cy", d => yScale(d.tip))

    innerChart.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "black");
    innerChart.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "black");

    // X axis
    innerChart.append("text")
      .attr("text-anchor", "middle")
      .attr("x", innerWidth / 2)
      .attr("y", innerHeight + margin.bottom - 15)
      .text("Total Bill");

    // Y axis
    innerChart.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", "rotate(-90)")
      .attr("x", -innerHeight / 2)
      .attr("y", -2*margin.left / 3)
      .text("Tips");

    // title
    svg.append("text")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .text("Total Bill vs Tips");
      
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
      <svg className="child1Svg">
        <g className="child1Graph"></g>
      </svg>
    );
  }
}

export default Child1;