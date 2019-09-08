import React, { Component } from 'react';

class PlayerDropDown extends Component {
  render () {
    return(
      <div className="selectPlayer">
        <label htmlFor="player">Player:</label>
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
      </div>
    );
  }
}

export default PlayerDropDown;