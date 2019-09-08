import React, { Component } from 'react';
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";
let myBarGraph;

class Graph extends Component {
  chartRef = React.createRef();
  
  componentDidMount() {
    this.buildChart();
  }

  componentDidUpdate() {
    this.buildChart();
  }

  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");

    const xAxis = Object.keys(this.props.statsObject);
    const graphData = Object.values(this.props.statsObject);

    if (typeof myBarGraph !== "undefined") myBarGraph.destroy();

    myBarGraph = new Chart(myChartRef, {
      type: this.props.type,
      data: {
        //Bring in data
        labels: xAxis,
        datasets: [
          {
            label: this.props.label,
            data: graphData,
          }
        ]
      },
      options: {
          //Customize chart options
      }
    });
  }

  render() {
    return (
      <div className="barGraph">
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}

export default Graph;
