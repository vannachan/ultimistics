import React from 'react';

const GameDropDown = (props) => {
  return (
    <div className="selectGame">
      <label htmlFor="game">Game:</label>
      <div className="dropDownContainer gameDropDown">
        <select 
          onChange={props.menuChange} 
          name="game" 
          id="game"
          value={props.gameName} 
        >
          <option disabled>Select a game</option>
          {
            props.allGames.map((game, i) => {
              return (
                <option key={i} value={game.title}>{game.title}</option>
              );
            })
          }
        </select>
      </div>
    </div>
  );
}

export default GameDropDown;