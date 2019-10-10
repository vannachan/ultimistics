import React from 'react';

const DisplayTracker = (props) => {
  return (
    <li>
      <div className="indivStat">
        <button onClick={props.addStat} className="add"> + </button>
        <p>{`${props.name}`}</p>
        <button onClick={props.subStat} className="subtract"> - </button>
      </div>
    </li>
  );
}

export default DisplayTracker;