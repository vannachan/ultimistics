import React, { Component } from 'react';

class AddGameForm extends Component {
  render () {
    return(
      <form action="" id="addGame">
        <input 
          type="text" 
          onChange={this.props.gameChange}
          value={this.props.gameVal}
          placeholder="Game Title" 
        />

        <button onClick={this.props.submit}>Add new game!</button>
      </form>
      
    );
  }
}

export default AddGameForm;