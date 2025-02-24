import React, { Component } from "react";
import * as d3 from "d3";
import Child1 from "./Child1";
import Child2 from "./Child2";
import tips from './tips.csv';
import "./App.css";

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: []
    }
    
    var tempData = [];
    //total_bill float, tip float, sex string, smoker string, day string, time string, size int
    d3.csv(tips, (data) => tempData.push({
      total_bill: parseFloat(data.total_bill), 
      tip:  parseFloat(data.tip),
      sex: (data.sex == "Male" ? true : false),//male true, female false
      smoker: (data.smoker == "Yes" ? true : false),
      day: data.day,
      time: data.time,
      size: parseInt(data.size)})).then(() => this.setState({ data: tempData }));
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <Child1 data={this.state.data}></Child1>
        <Child2 data={this.state.data}></Child2>
      </div>
    );
  }
}

export default App;