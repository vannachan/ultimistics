import React from 'react';
import DisplayTracker from './DisplayTracker';
import AddPlayerForm from './AddPlayerForm';
import Graph from './Graph';

const TrackerGraph = (props) => {
  return (
    <section className="rightCard">
      <div className="rightTabs">
        <button onClick={props.trackerHandler} className={`${props.appState.isGraphShowing ? "notSelected tab" : "tab"}`}>Tracker</button>
        <button onClick={props.graphHandler} className={`${props.appState.isGraphShowing ? "tab" : "notSelected tab"}`}>Graph</button>
      </div>

      <div className="rightContent">

        {!props.appState.isGraphShowing && <section className="statsCounter">
          <ul>
            {
              Object.keys(props.appState.currStats).map( (statName) => {
                return (
                  <DisplayTracker 
                    name={statName}
                    addStat={() => props.addHandler(statName)}
                    subStat={() => props.subHandler(statName)}
                    key={statName}
                  />
                );
              })
            }
          </ul>
        </section>}

        {props.appState.isGraphShowing && <Graph 
          allGames={props.appState.allGames}
          statsObject={props.appState.currStats}
          label={props.appState.currGame}
          gamesClick={props.numGamesHandler}
          isSingleGraph={props.appState.isSingleGraph}
        />}
      </div> {/* end of ./rightContent */}

      <AddPlayerForm 
        addPlayerRef={props.addPlayerRef}
        nameChange={props.nameChangeHandler}
        nameVal={props.appState.userPlayer}
        posChange={props.posChangeHandler}
        submit={props.playerSubmitHandler}
      />
      
    </section>
  );
}

export default TrackerGraph;