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
            allPlayers={this.props.appState.allPlayers}
          />

          <h2>{this.props.appState.playerName}</h2>
          <h3>Position: {this.props.appState.playerPosition}</h3>
        </div>

        <div className="playerSummary">
          <div className="gameTitle">
            <h4>Game Summary</h4>
            <GameDropDown 
              menuChange={this.props.gameSelectHandler}
              allGames={this.props.appState.allGames}
              gameName={this.props.appState.gameName}
            />
          </div>

          <SummaryTable 
            summaryObject={this.props.appState.currStats}
          />
        </div>

        <div className="newGameContainer">
          <AddGameForm 
            gameChange={this.props.gameChangeHandler}
            gameVal={this.props.appState.gameVal}
            submit={this.props.gameSubmitHandler}
          />
        </div>
      </section>
    );
  }
}

export default PlayerSummary;