import React, { Component } from 'react';

class DisplayTracker extends Component {
  render () {
    return(
      <li>
        <div className="indivStat">
          <button onClick={this.props.addStat} className="add"> + </button>
          <p>{`${this.props.name}`}</p>
          <button onClick={this.props.subStat} className="subtract"> - </button>
        </div>
      </li>
      
    );
  }
}

export default DisplayTracker;