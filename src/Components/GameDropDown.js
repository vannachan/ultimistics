import React, { Component } from 'react';

class GameDropDown extends Component {
  render () {
    return(
      <div className="selectGame">
        <label htmlFor="game">Game:</label>
        <select 
          onChange={this.props.menuChange} 
          name="game" 
          id="game"
          value={this.props.gameName} 
        >
          <option disabled>Select a game</option>
          {
            this.props.allGames.map((game, i) => {
              return (
                <option key={i} value={game.title}>{game.title}</option>
              );
            })
          }
        </select>
      </div>
    );
  }
}

export default GameDropDown;