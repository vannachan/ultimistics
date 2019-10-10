import React from 'react';

const PlayerDropDown = (props) => {
  return (
    <div className="selectPlayer">
      <label htmlFor="player">Player:</label>
      <span className="dropDownContainer playerDropDown">
        <select 
          onChange={props.menuChange} 
          name="player" 
          id="player"
        >
          <option disabled>Select a player</option>
          {
            props.allPlayers.map( (player, i) => {
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

export default PlayerDropDown;