import React, { Component } from 'react';

class PlayerDropDown extends Component {
  render() {
    return(
      <div className="selectPlayer">
        <label htmlFor="player">Player:</label>
        <span className="dropDownContainer playerDropDown">
          <select 
            onChange={this.props.menuChange} 
            name="player" 
            id="player"
          >
            <option disabled>Select a player</option>
            {
              this.props.allPlayers.map( (player, i) => {
                return (
                  <option key={player}>{player}</option>
                );
              })
            }
          </select>
        </span>
      </div>
    );
  }
}

export default PlayerDropDown;