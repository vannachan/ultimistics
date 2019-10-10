import React, { Component } from 'react';
import Chart from "chart.js";
let myGraph;

class Graph extends Component {
  // ============================================
  // Constructor
  // ============================================
  constructor() {
    super();
    this.state = {
      graphType: "bar"
    }
  }

  chartRef = React.createRef();
  
  // ============================================
  // Component Did Mount
  // ============================================
  componentDidMount() {
    this.buildChart();
  }

  // ============================================
  // Component Did Update
  // ============================================
  componentDidUpdate() {
    this.buildChart();
  }

  // ============================================
  // Handler - Select Bar Graph
  // ============================================
  handleBar = () => {
    this.setState({
      graphType: "bar"
    });
  }

  // ============================================
  // Handler - Select Radar Graph
  // ============================================
  handleRadar = () => {
    this.setState({
      graphType: "radar"
    });
  }

  // ============================================
  // Build Chart
  // ============================================
  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");

    let dataArray = [];
    const xAxis = Object.keys(this.props.statsObject);

    if (this.props.isSingleGraph) {
      const dataSet1 = Object.values(this.props.statsObject);
      dataArray.push({
          label: this.props.label,
          data: dataSet1,
          backgroundColor: 'rgba(255,241,0,0.3)',
          borderColor: 'rgba(255,241,0,1)',
          borderWidth: 3,
          pointRadius: 4
      });
    } else {
      // Alright, alright, alright, let's display three datasets!
      const length = this.props.allGames.length;
      const dataSet1 = Object.values(this.props.allGames[length-3].stats);
      const dataSet2 = Object.values(this.props.allGames[length-2].stats);
      const dataSet3 = Object.values(this.props.allGames[length-1].stats);
      dataArray.push({
        label: this.props.allGames[length-3].title,
        data: dataSet1,
        backgroundColor: 'rgba(255,113,167,0.3)',
        borderColor: 'rgba(255,113,167,1)',
        borderWidth: 3,
        pointRadius: 4
      },{
        label: this.props.allGames[length-2].title,
        data: dataSet2,
        backgroundColor: 'rgba(255,241,0,0.3)',
        borderColor: 'rgba(255,241,0,1)',
        borderWidth: 3,
        pointRadius: 4
      },{
        label: this.props.allGames[length-1].title,
        data: dataSet3,
        backgroundColor: 'rgba(155,249,33,0.3)',
        borderColor: 'rgba(155,249,33,1)',
        borderWidth: 3,
        pointRadius: 4
      });
    }
    
    // If a previous instance is present, destroy it first!
    if (typeof myGraph !== "undefined") myGraph.destroy();

    myGraph = new Chart(myChartRef, {
      type: this.state.graphType,
      data: {
        //Bring in data
        labels: xAxis,
        datasets: dataArray
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

  // ============================================
  // Render
  // ============================================
  render() {
    return (
      <div className="graphCard">
        <div className="graphButtonContainer">
          <button onClick={this.props.gamesClick} className="numGameButton">{this.props.isSingleGraph ? "Last 3 Games" : "Latest Game"}</button>
          <div className="typeButtons">
            <button onClick={this.handleBar}>Bar</button>
            <button onClick={this.handleRadar}>Radar</button>
          </div>
        </div>
        <div className="graphContainer">
          <canvas
            id="myChart"
            ref={this.chartRef}
          />
        </div>
      </div>
    );
  }
}

export default Graph;
