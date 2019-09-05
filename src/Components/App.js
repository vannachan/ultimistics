import React, { Component } from 'react';
import '../Sass/App.scss';
import firebase from '../firebase';

class App extends Component {

  // ======================
  // Constructor
  // ======================
  constructor() {
    super();
    this.state = {
      playerName: "Vanna Chan",
      playerAlias: "vchan",
      position: "",
      allGames: [],
      currGame: "",
      currStats: {}
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

      console.log("This is the full database:", response);

      for (let key in response) {

        // Let's see if we can find a player name match
        if (response[key].name === this.state.playerName) {
          // Player found, let's store all the game history!
          const newPosition = response[key].position;
          const newGameState = response[key].games;

          // Populate our state with some initial information from the last game we had!
          const totalGames = newGameState.length;
          const newGameTitle = newGameState[totalGames - 1].title;
          const newStats = newGameState[totalGames - 1].stats;
    
          this.setState({
            position: newPosition,
            allGames: newGameState,
            currGame: newGameTitle,
            currStats: newStats
          });

        } // end if
      } // end for-in
    });

  }

  // ======================
  // Handle Click
  // ======================
  handleClick = (event) => {
    event.preventDefault();
    const name = "vchan"
    const dbRef = firebase.database().ref().child(`${name}_games`);

    dbRef.push({
      "name": "Vanna Chan",
      "title": "Game5this one",
      "stats": {
        "points": 1,
        "drops": 0,
        "assists": 3,
        "blocks": 1,
        "completions": 10
      }
    });

    // this is how you push an object into firebase
    // dbRef.push({
    //   book: this.state.userInput,
    //   author: this.state.author
    // });
  }

  // ======================
  // Handle Game Name Change
  // ======================
  handleChange = (event) => {
    this.setState({
      game: event.target.value
    });
  }

  // ======================
  // Add Game
  // ======================
  addGame = (event) => {
    event.preventDefault();
    const defaultStats = {
      points: 1,
      drops: 2,
      assists: 3,
      blocks: 4,
      completions: 5
    };

    this.setState( {
      stats: defaultStats

    });

    console.log(this.state);
    console.log(this.state.stats);
    const dbRef = firebase.database().ref().child(`${this.state.alias}_games`);
    
    // dbRef.push({
    //   "title": this.state.game,
    //   "stats": this.state.stats
    // });

  }

  // ======================
  // Display Stats
  // ======================
  displayStats = () => {
    let summary = [];
  
    for (let key in this.state.currStats) {
      summary.push(<li key={key}>{`${key}: ${this.state.currStats[key]}`}</li>);
    }

    return summary;
  }

  // ======================
  // Render
  // ======================
  render () {
    return (
      <div className="App">
        <h1>Ultimistics Tracking App</h1>
        <h2>{this.state.playerName}</h2>
        <h3>Position: {this.state.position}</h3>

        <div className="playerSummary">
          <h4>Game Summary</h4>
          <h5>Game Name: {this.state.currGame}</h5>
          <ul>
            {this.displayStats()}
          </ul>
        </div>

        <div className="statsCounter">
        
        </div>

        <input 
          type="text" 
          onChange={this.handleChange}
          value={this.state.game}
          placeholder="Game Title" />
        <button onClick={this.addGame}>Add new game!</button>
        {/*<button onClick={this.handleCLick}>Click me</button>*/}
      </div>
    );
  }
}

export default App;
