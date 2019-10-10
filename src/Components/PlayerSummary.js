import React, { Component } from 'react';
import PlayerDropDown from './PlayerDropDown';
import GameDropDown from './GameDropDown';
import SummaryTable from './SummaryTable';
import AddGameForm from './AddGameForm';

class PlayerSummary extends Component {
  render() {
    return (
      <section className="info leftCard">
        <div className="playerInfo">

          <PlayerDropDown 
            menuChange={this.props.playerChangeHandler}
            allPlayers={this.props.allPlayers}
          />

          <h2>{this.props.playerName}</h2>
          <h3>Position: {this.props.playerPosition}</h3>
        </div>

        <div className="playerSummary">
          <div className="gameTitle">
            <h4>Game Summary</h4>
            <GameDropDown 
              menuChange={this.props.gameSelectHandler}
              allGames={this.props.allGames}
              gameName={this.props.gameName}
            />
          </div>

          <SummaryTable 
            summaryObject={this.props.currStats}
          />
        </div>

        <div className="newGameContainer">
          <AddGameForm 
            gameChange={this.props.gameChangeHandler}
            gameVal={this.props.gameVal}
            submit={this.props.gameSubmitHandler}
          />
        </div>
      </section>
    );
  }
}

export default PlayerSummary;