import React, { Component } from 'react';
import '../Sass/App.scss';
import firebase from '../firebase';
import PlayerSelect from './PlayerSelect';
import Summary from './Summary';

class App extends Component {

  // ======================
  // Constructor
  // ======================
  constructor() {
    super();
    this.state = {
      database: [],
      allPlayers: [],
      totalPlayers: 0,
      playerName: "",
      // playerAlias: "vchan",
      playerId: 0,
      position: "",
      allGames: [],
      totalGames: 0,
      currGame: "",
      currGameId: 0,
      currStats: {},
      userGame: "",
      userPlayer: "",
      userPosition: ""
    }
  }

  // ======================
  // Component Did Mount
  // ======================
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    // Load up the entire database and reload when there are ANY updates
    dbRef.on('value', (data) => {
      const response = data.val();
      console.log("This is the resp",response);

      let players=[];

      for (let key in response) {
        // Populate our full roster of players
        players.push(response[key].name);

        // Let's see if we can find a player name match
        if (response[key].name === this.state.playerName) {

          // Player found, let's store all the game history!
          const newPosition = response[key].position;
          const newGameState = response[key].games;

          // Populate our state with some initial information from the last game we had!
          const totalGames = newGameState.length;
          const newGameTitle = newGameState[totalGames - 1].title;
          const newGameId = totalGames - 1;
          const newStats = newGameState[totalGames - 1].stats;
    
          this.setState({
            playerId: key,
            position: newPosition,
            allGames: newGameState,
            totalGames: totalGames,
            currGame: newGameTitle,
            currGameId: newGameId,
            currStats: newStats
          });

        } 
      } // end for-in

      this.setState({
        database: response,
        allPlayers: players,
        totalPlayers: players.length
      });

    });
  }

  // ======================
  // Upload Curr Stats to Firebase
  // ======================
  uploadStats = () => {
    const dbRef = firebase.database().ref(`${this.state.playerId}/games/${this.state.currGameId}/stats`);

    // Anddd write it into Firebase
    dbRef.set(this.state.currStats);
  }

  // ======================
  // Player Select
  // ======================
  selectPlayer = (event) => {

    // Upload stats to Firebase before we change anything
    this.uploadStats();

    const db = [...this.state.database];
    for (let key in db) {
      
      // Let's see if we can find a player name match
      if (db[key].name === event.target.value) {
        // Player found, let's store all the game history!
        const newPosition = db[key].position;
        const newGameState = db[key].games;

        // Populate our state with some initial information from the last game we had!
        const totalGames = newGameState.length;
        const newGameTitle = newGameState[totalGames - 1].title;
        const newGameId = totalGames - 1;
        const newStats = newGameState[totalGames - 1].stats;
  
        this.setState({
          playerId: key,
          position: newPosition,
          allGames: newGameState,
          totalGames: totalGames,
          currGame: newGameTitle,
          currGameId: newGameId,
          currStats: newStats
        });

      } // end if
    } // end for-in

    this.setState({
      playerName: event.target.value,
      playerId: event.target.options.selectedIndex - 1
    });
  }

  // ======================
  // Handler -  Game Input Change
  // ======================
  handleGameChange = (event) => {
    this.setState({
      userGame: event.target.value
    });
  }

  // ======================
  // Handler - Name Input Change
  // ======================
  handlePlayerChange = (event) => {
    this.setState({
      userPlayer: event.target.value
    });
  }

  // ======================
  // Add Game
  // ======================
  addGame = (event) => {
    event.preventDefault();

    // Upload stats to Firebase before we change anything
    this.uploadStats();

    const defaultStats = {
      assists: 0,
      blocks: 0,
      callahans: 0,
      catches: 0, 
      drops: 0,
      goals: 0,
      pulls: 0,
      stalls: 0,
      throwaways: 0,
      touches: 0
    };

    // Only add new game when the Player is selected
    if (this.state.playerName != '') {
      const dbRef = firebase.database().ref(`${this.state.playerId}/games`);
  
      // NTS: The child of the reference point is set to a number in order to keep the Array structure, if this is set to anything else, the app will break because Firebase will create its own key and turn the Array into an Object when using the simple .push() method
      dbRef.child(this.state.totalGames).set({
        title: this.state.userGame,
        stats: defaultStats
      });
    } else {
      alert("Please give a name to this epic game!");
    }

    this.setState({
      userGame: '',
    });
  }

  
  // ======================
  // Handler - Select Position
  // ======================
  selectPosition = (event) => {
    this.setState({
      userPosition: event.target.value
    });
  }

  // ======================
  // Add Player
  // ======================
  // FIXME: Couldn't seem to figure out how to load the page after a new player was added, so for now the user has to select this new player from the dropdown menu
  // - Look into how this.setState is used as a synchronous event
  // - I was able to load the state but the check done in ComponentDidMount() didn't populate with the latest player's info...
  // ======================
  addPlayer = (event) => {
    event.preventDefault();

    // Upload stats to Firebase before we change anything
    this.uploadStats();

    // Is there a duplicate in names?
    let isUnique = true;
    for (let i = 0; i < this.state.database.length; i++) {
      if (this.state.userPlayer == this.state.database[i].name) {
        isUnique = false;
      }
    }

    if (isUnique && this.state.userPlayer !== '' && this.state.userPosition !== '') {
      
      const newPlayer = this.state.userPlayer;
      const newPos = this.state.userPosition;

      const dbRef = firebase.database().ref();
  
      // NTS: The child of the reference point is set to a number in order to keep the Array structure, if this is set to anything else, the app will break because Firebase will create its own key and turn the Array into an Object when using the simple .push() method
      dbRef.child(this.state.totalPlayers).set({
        name: newPlayer,
        position: newPos,
        games: [{
          title: "First Game",
          stats: {
            assists: 0,
            blocks: 0,
            callahans: 0,
            catches: 0, 
            drops: 0,
            goals: 0,
            pulls: 0,
            stalls: 0,
            throwaways: 0,
            touches: 0
          }
        }]
      });

      this.setState({
        userPlayer: ''
      });
  
      document.getElementById("addPlayer").reset();

      alert(`${newPlayer} added successfully! Select them in the dropdown menu to start tracking!`);
    } else if (!isUnique) {
      alert("Uh oh! Looks like that player is already in the database!");
    } else if (this.state.userPlayer === '') {
      alert("Missing name.. everyone's got a name!");
    } else if (this.state.userPosition === '') {
      alert("Pick a position, any position!");
    } else {
      alert("Sorry, we can't add ghost players!");
    }
  }

  // ======================
  // Display Stats Counter Section
  // ======================
  displayStatsTrack = () => {
    let tracker = [];
  
    for (let key in this.state.currStats) {
      tracker.push(
        <li key={key}>
          <button onClick={() => this.handleAdd(key)}> + </button>
          <p>{`${key}`}</p>
          <button onClick={() => this.handleSubtract(key)}> - </button>
        </li>
      );
    }

    return tracker;
  }

  // ======================
  // Add Stats
  // ======================
  handleAdd = (key) => {
    let newStats = this.state.currStats;
    newStats[key]++;

    this.setState({
      currStats: newStats
    });
  }

  // ======================
  // Subtract Stats
  // ======================
  handleSubtract = (key) => {
    let newStats = this.state.currStats;
    if (newStats[key] > 0) {
      newStats[key]--;
      
      this.setState({
        currStats: newStats
      });
    }
  }

  // ======================
  // Render
  // ======================
  render () {
    return (
      <div className="App">
        <h1>Ultimistics Tracking App</h1>
        <div className="wrapper">
          <section className="info">
            <div className="playerInfo">

            <label htmlFor="player">Player:</label>
            <select 
              onChange={this.selectPlayer} 
              name="player" 
              id="player"
              defaultValue={'DEFAULT'} 
            >
              <option value="DEFAULT" disabled>Select a player</option>
              {
                this.state.allPlayers.map( (player, index) => {
                  return (
                    <PlayerSelect 
                      name={player} 
                      key={index} 
                    />
                  );
                })
              }
            </select>

              <h2>{this.state.playerName}</h2>
              <h3>Position: {this.state.position}</h3>
            </div>
    
            <div className="playerSummary">
              <div className="gameTitle">
                <h4>Game Summary</h4>
                <h5>Game Name: {this.state.currGame}</h5>
              </div>
              <table>
                <Summary summaryObject={this.state.currStats} />
              </table>
            </div>

            <div className="newGame">

              <form action="">
                <input 
                  type="text" 
                  onChange={this.handleGameChange}
                  value={this.state.userGame}
                  placeholder="Game Title" />
                <button onClick={this.addGame}>Add new game!</button>
              </form>

              <form action="" id="addPlayer">
                <input 
                  type="text" 
                  onChange={this.handlePlayerChange}
                  value={this.state.userPlayer}
                  placeholder="Player Name" 
                />
                <select 
                  onChange={this.selectPosition}   
                  name="position" 
                  id="position" 
                  defaultValue={'DEFAULT'}
                >
                  <option value="DEFAULT" disabled>Choose a position</option>
                  <option>Handler</option>
                  <option>Cutter</option>
                  <option>Hybrid</option>
                </select>

                <button onClick={this.addPlayer}>Add new player!</button>
              </form>
            </div>
          </section>
  
          <div className="counter">
            <section className="statsCounter">
              <ul>
                {this.displayStatsTrack()}
              </ul>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
