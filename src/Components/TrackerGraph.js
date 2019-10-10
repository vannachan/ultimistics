import React, { Component } from 'react';
import DisplayTracker from './DisplayTracker';
import AddPlayerForm from './AddPlayerForm';
import Graph from './Graph';

class TrackerGraph extends Component {
  // ============================================
  // Render
  // ============================================
  render() {
    return (
      <section className="rightCard">
        <div className="rightTabs">
          <button onClick={this.props.trackerHandler} className={`${this.props.appState.isGraphShowing ? "notSelected tab" : "tab"}`}>Tracker</button>
          <button onClick={this.props.graphHandler} className={`${this.props.appState.isGraphShowing ? "tab" : "notSelected tab"}`}>Graph</button>
        </div>

        <div className="rightContent">

          {!this.props.appState.isGraphShowing && <section className="statsCounter">
            <ul>
              {
                Object.keys(this.props.appState.currStats).map( (statName) => {
                  return (
                    <DisplayTracker 
                      name={statName}
                      addStat={() => this.props.addHandler(statName)}
                      subStat={() => this.props.subHandler(statName)}
                      key={statName}
                    />
                  );
                })
              }
            </ul>
          </section>}

          {this.props.appState.isGraphShowing && <Graph 
            allGames={this.props.appState.allGames}
            statsObject={this.props.appState.currStats}
            label={this.props.appState.currGame}
            gamesClick={this.props.numGamesHandler}
            isSingleGraph={this.props.appState.isSingleGraph}
          />}
        </div> {/* end of ./rightContent */}

        <AddPlayerForm 
          addPlayerRef={this.props.addPlayerRef}
          nameChange={this.props.nameChangeHandler}
          nameVal={this.props.appState.userPlayer}
          posChange={this.props.posChangeHandler}
          submit={this.props.playerSubmitHandler}
        />
        
      </section>
    );
  }
}

export default TrackerGraph;