import React, { Component } from 'react';

class AddPlayerForm extends Component {
  render () {
    return(
      <form action="" id="addPlayer">
        <input 
          type="text" 
          onChange={this.props.nameChange}
          value={this.props.nameVal}
          placeholder="Player Name" 
        />
        <select 
          onChange={this.props.posChange}   
          name="position" 
          id="position" 
          defaultValue={'DEFAULT'}
        >
          <option value="DEFAULT" disabled>Choose a position</option>
          <option>Handler</option>
          <option>Cutter</option>
          <option>Hybrid</option>
        </select>

        <button onClick={this.props.submit}>Add new player!</button>
      </form>
      
    );
  }
}

export default AddPlayerForm;