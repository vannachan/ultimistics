import React, { Component } from 'react';

class DisplayTracker extends Component {
  render () {
    return(
      <li>
        <div className="indivStat">
          <button onClick={this.props.addStat}> + </button>
          <p>{`${this.props.name}`}</p>
          <button onClick={this.props.subStat}> - </button>
        </div>
      </li>
      
    );
  }
}

export default DisplayTracker;