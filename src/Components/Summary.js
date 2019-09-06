import React, { Component } from 'react';

const Summary = (props) => {
  let stats = [];

  for (let key in props.summaryObject) {
    
    stats.push(
      <tr key={key}>
        <th>{key}</th>
        <td>{props.summaryObject[key]}</td>
      </tr>);
    // stats.push(<li key={key}><p>{`${key}: ${props.summaryObject[key]}`}</p></li>);
  }

  return stats;
};

export default Summary;