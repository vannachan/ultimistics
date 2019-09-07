import React, { Component } from 'react';

class SummaryTable extends Component {
  generateRow = (sumObject) => {
    let stats = [];

    for (let key in sumObject) {
      stats.push(
        <tr key={key}>
          <th>{key}</th>
          <td>{sumObject[key]}</td>
        </tr>);
    }

    return stats;
  }

  render() {
    return(
      <table>
        <tbody>
          {this.generateRow(this.props.summaryObject)}
        </tbody>
      </table>
    );
  }
}

export default SummaryTable;