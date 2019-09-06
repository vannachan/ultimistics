import React, { Component } from 'react';

const Summary = (props) => {
  let stats = [];

  for (let key in props.summaryObject) {
    stats.push(<li key={key}>{`${key}: ${props.summaryObject[key]}`}</li>);
  }

  return stats;
};

export default Summary;