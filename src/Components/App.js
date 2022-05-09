import React, { Component } from 'react';
import '../Sass/App.scss';
import firebase from '../firebase';
import Swal from 'sweetalert2';
import Faq from './Faq';
import PlayerSummary from './PlayerSummary';
import TrackerGraph from './TrackerGraph';

class App extends Component {
  // ============================================
  // Constructor
  // ============================================
  constructor() {
    super();
    this.state = {
      isFirstVisit: true,

      // general storage states
      database: [],
      allPlayers: [],
      totalPlayers: 0,

      // player specific states
      playerName: "",
      playerId: 0,
      position: "",
      allGames: [],
      totalGames: 0,

      // current game states
      currGame: "",
      currGameId: 0,
      currStats: {},

      // user input states
      userGame: "",
      userPlayer: "",
      userPosition: "",

      // graph states
      isGraphShowing: false,
    }
  } // end of constructor()

  addPlayerRef = React.createRef();

  // ============================================
  // Component Did Mount
  // ============================================
  componentDidMount() {
    const dbRef = firebase.database().ref();
    
    // Load up the entire database and reload when there are ANY updates
    dbRef.on('value', (data) => {
      const response = data.val();

      let players=[];
      let newName = "";
      let newPosition = "";
      let newPlayerId = 0;
      let newGameState = [];

      for (let key in response) {
        // Populate our full roster of players
        players.push(response[key].name);
      }

      // On default, just display the first player on the list
      if (this.state.isFirstVisit) {
        newName = response[0].name;
        newPosition = response[0].position;
        newGameState = response[0].games;
      } else {
        newName = response[this.state.playerId].name;
        newPosition = response[this.state.playerId].position;
        newPlayerId = this.state.playerId;
        newGameState = response[this.state.playerId].games;
      }

      // Populate our state with some initial information from the last game we had!
      const totalGames = newGameState.length;
      const newGameTitle = newGameState[totalGames - 1].title;
      const newGameId = totalGames - 1;
      const newStats = newGameState[totalGames - 1].stats;

      this.setState({
        isFirstVisit: false,
        database: response,
        allPlayers: players,
        totalPlayers: players.length,
        playerName: newName,
        playerId: newPlayerId,
        position: newPosition,
        allGames: newGameState,
        totalGames: totalGames,
        currGame: newGameTitle,
        currGameId: newGameId,
        currStats: newStats
      });
    });
  } // end of componentDidMount()

  // ============================================
  // Upload Current Stats to Firebase🔥
  // ============================================
  uploadStats = () => {
    const dbRef = firebase.database().ref(`${this.state.playerId}/games/${this.state.currGameId}/stats`);

    // Anddd write it into Firebase
    dbRef.set(this.state.currStats);
  }

  // ============================================
  // Handler - Player Select
  // ============================================
  handleSelectPlayer = (event) => {

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
        
        // Check if this new player has >3 games, if they do, just leave the isSingleGraph var, otherwise, make sure we are only displaying 1 graph
        const isSingleGraph = (totalGames >= 3) ? this.state.isSingleGraph : true;

        this.setState({
          playerId: key,
          position: newPosition,
          allGames: newGameState,
          totalGames: totalGames,
          currGame: newGameTitle,
          currGameId: newGameId,
          currStats: newStats,
          isSingleGraph: isSingleGraph
        });

      } // end if
    } // end for-in

    this.setState({
      playerName: event.target.value,
      playerId: event.target.options.selectedIndex - 1
    });
  } // end of handleSelectPlayer()

  // ============================================
  // Handler -  New Game Input Change
  // ============================================
  handleGameChange = (event) => {
    this.setState({
      userGame: event.target.value
    });
  }

  // ============================================
  // Handler - Add New Game to Firebase
  // ============================================
  handleAddGame = (event) => {
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
      layouts: 0,
      pulls: 0,
      throwaways: 0,
      touches: 0
    };

    const newGameName = this.state.userGame;
    const totalGames = this.state.totalGames;

    // Only add new game when the Player is selected
    if (this.state.playerName !== '' && this.state.userGame !== '') {
      const dbRef = firebase.database().ref(`${this.state.playerId}/games`);
  
      // NTS: The child of the reference point is set to a number in order to keep the Array structure, if this is set to anything else, the app will break because Firebase will create its own key and turn the Array into an Object when using the simple .push() method
      dbRef.child(this.state.totalGames).set({
        title: this.state.userGame,
        stats: defaultStats
      });

      this.setState({
        currGame: newGameName,
        currGameId: totalGames,
        currStats: defaultStats,
        userGame: ''
      });
    } else if (this.state.playerName == '') {
      Swal.fire(
        'Whoops',
        'A player needs to be selected before a game can be added!',
        'error'
      );
    } else if (this.state.userGame == '') {
      Swal.fire(
        'Oops...',
        'Please give a name to this epic game!',
        'error'
      );
    }
  } // end of handleAddGame()

  // ============================================
  // Handler - New Player Name Input Change
  // ============================================
  handlePlayerChange = (event) => {
    this.setState({
      userPlayer: event.target.value
    });
  }

  // ============================================
  // Handler - New Player Position Input Change
  // ============================================
  handleSelectPosition = (event) => {
    this.setState({
      userPosition: event.target.value
    });
  }

  // ============================================
  // Handler - Add New Player to Firebase
  // ============================================
  // FIXME: Couldn't seem to figure out how to load the page after a new player was added, so for now the user has to select this new player from the dropdown menu
  // - Look into how this.setState is used as a synchronous event
  // - I was able to load the state but the check done in ComponentDidMount() didn't populate with the latest player's info...
  // ============================================
  handlerAddPlayer = (event) => {
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
            layouts: 0,
            pulls: 0,
            throwaways: 0,
            touches: 0
          }
        }]
      });

      this.setState({
        userPlayer: '',
        userPosition: ''
      });

      // Clear the Add Player Form
      this.addPlayerRef.current.reset();
      
      Swal.fire(
        'Woohoo!',
        `<strong>${newPlayer}</strong> was added successfully! Select them in the dropdown menu to start tracking!`,
        'success'
      );
    } else if (!isUnique) {
      Swal.fire(
        'Oops...',
        'Looks like that player is already in the database, find them in the drop down menu!',
        'error'
      );

      this.setState({
        userPlayer: '',
        userPosition: ''
      });

      // Clear the Add Player Form
      this.addPlayerRef.current.reset();

    } else if (this.state.userPlayer === '' && this.state.userPosition === '') {
      Swal.fire(
        'Ghost Detected! 👻',
        `We are missing <em>ALLL</em> the info! We can't add a ghost player to the database!`,
        'error'
      );
    } else if (this.state.userPlayer === '') {
      Swal.fire(
        'Oh no!',
        `Missing name.. everyone's got a name!`,
        'error'
      );
    } else if (this.state.userPosition === '') {
      Swal.fire(
        'Oops...',
        'Pick a position, any position!',
        'error'
      );
    }
  } // end of handlerAddPlayer()

  // ============================================
  // Handler - Select Game from Drop Down
  // ============================================
  handleSelectGame = (event) => {
    // Upload stats to Firebase before we change anything
    this.uploadStats();

    let newGameId = 0;
    let newStats = {};
    for (let i = 0; i < this.state.allGames.length; i++) {
      if (event.target.value === this.state.allGames[i].title) {
        newGameId = i;
        newStats = this.state.allGames[i].stats;
      }
    }

    this.setState({
      currGame: event.target.value,
      currGameId: newGameId,
      currStats: newStats
    });
  }

  // ============================================
  // Handler - Stat Addition
  // ============================================
  handleAdd = (key) => {
    let newStats = this.state.currStats;
    newStats[key]++;

    this.setState({
      currStats: newStats
    });
  }

  // ============================================
  // Handler - Stat Subtraction
  // ============================================
  handleSubtract = (key) => {
    let newStats = this.state.currStats;
    if (newStats[key] > 0) {
      newStats[key]--;
      
      this.setState({
        currStats: newStats
      });
    }
  }

  // ============================================
  // Handler - Select Tracker UI
  // ============================================
  handleTracker = () => {
    this.setState({
      isGraphShowing: false
    });
  }

  // ============================================
  // Handler - Select Graph UI
  // ============================================
  handleGraph = () => {
    // Upload stats to Firebase before we change anything
    this.uploadStats();

    this.setState({
      isGraphShowing: true
    });
  }

  // ============================================
  // Handler - Toggle between Latest and Last 3 Games
  // ============================================
  handleNumGames = () => {
    if (this.state.totalGames >= 3) {
      let toggle = !this.state.isSingleGraph;
      this.setState({
        isSingleGraph: toggle
      });
    } else {
      Swal.fire(
        'Not enough game data!',
        'Play a couple more games to see this graph!',
        'error');
    }
  }

  // ============================================
  // Render
  // ============================================
  render() {
    return (
      <div className="App">
        <header>
          <div className="headerWrapper">
            <h1>Ultimistics.</h1>
          </div>
        </header>

        <main className="wrapper">
          <PlayerSummary 
            appState={this.state}
            playerChangeHandler={this.handleSelectPlayer}
            gameSelectHandler={this.handleSelectGame}
            gameChangeHandler={this.handleGameChange}
            gameSubmitHandler={this.handleAddGame}
          />

          <TrackerGraph
            appState={this.state}
            trackerHandler={this.handleTracker}
            graphHandler={this.handleGraph}
            addHandler={this.handleAdd}
            subHandler={this.handleSubtract}
            numGamesHandler={this.handleNumGames}
            addPlayerRef={this.addPlayerRef}
            nameChangeHandler={this.handlePlayerChange}
            posChangeHandler={this.handleSelectPosition}
            playerSubmitHandler={this.handlerAddPlayer}
          />
        </main>

        <footer>
          <p>Coded and designed by <a href="https://twitter.com/_vannachan" target="_blank">Vanna Chan</a> © {new Date().getFullYear()}</p>
        </footer>

        <Faq/>
      </div>
    );
  }
}

export default App;
