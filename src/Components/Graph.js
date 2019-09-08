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
            backgroundColor: 'rgba(255,255,0,0.3)',
            borderColor: 'rgba(255,255,0,1)',
            borderWidth: 3,
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: 'Ultimate Frisbee Stats'
        },
        tooltips: {
              callbacks: {
                  label: function(tooltipItem, data) {
                      var label = data.datasets[tooltipItem.datasetIndex].label || '';
  
                      if (label) {
                          label += ': ';
                      }
                      label += Math.round(tooltipItem.yLabel * 100) / 100;
                      return label;
                  }
              }
          }
      }
    });
  }

  render() {
    return (
      <div className="graphCard">
        <div className="graphButtonContainer">
          <button onClick={this.props.gamesClick}>{this.props.numGame ? "Last 3 Games" : "Latest Game"}</button>
          <button onClick={this.props.barClick}>Bar</button>
          <button onClick={this.props.radarClick}>Radar</button>
        </div>
        <div className="graphContainer">
          <canvas
            id="myChart"
            ref={this.chartRef}
          />
        </div>
      </div>
    )
  }
}

export default Graph;
