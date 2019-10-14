import React from 'react';
import PlayerDropDown from './PlayerDropDown';
import GameDropDown from './GameDropDown';
import SummaryTable from './SummaryTable';
import AddGameForm from './AddGameForm';

const PlayerSummary = (props) => {
  return (
    <section className="info leftCard">
      <div className="playerInfo">

        <PlayerDropDown 
          menuChange={props.playerChangeHandler}
          allPlayers={props.appState.allPlayers}
        />

        <h2>{props.appState.playerName}</h2>
        <h3>Position: {props.appState.playerPosition}</h3>
      </div>

      <div className="playerSummary">
        <div className="gameTitle">
          <h4>Game Summary</h4>
          <GameDropDown 
            menuChange={props.gameSelectHandler}
            allGames={props.appState.allGames}
            gameName={props.appState.currGame}
          />
        </div>

        <SummaryTable 
          summaryObject={props.appState.currStats}
        />
      </div>

      <div className="newGameContainer">
        <AddGameForm 
          gameChange={props.gameChangeHandler}
          gameVal={props.appState.gameVal}
          submit={props.gameSubmitHandler}
        />
      </div>
    </section>
  );
}

export default PlayerSummary;