import React, { Component } from 'react';

class DisplayTracker extends Component {
  render () {
    return(
      <li>
        <button onClick={this.props.addStat}> + </button>
        <p>{`${this.props.name}`}</p>
        <button onClick={this.props.subStat}> - </button>
      </li>
      
    );
  }
}

export default DisplayTracker;