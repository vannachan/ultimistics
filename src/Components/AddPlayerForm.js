import React, { Component } from 'react';

class AddPlayerForm extends Component {
  render () {
    return(
      <form action="" id="addPlayer" ref={this.props.addPlayerRef} className="addPlayerForm">
        <label htmlFor="newPlayerName" className="visuallyHidden">Enter new player's name</label>
        <input 
          type="text"
          name="newPlayerName" 
          id="newPlayerName"  
          onChange={this.props.nameChange}
          value={this.props.nameVal}
          placeholder="New Player Name" 
        />
        <span className="newPlayerPosDropDown dropDownContainer">
          <label htmlFor="newPlayerPosition" className="visuallyHidden">Dropdown menu for player's position</label>
          <select 
            onChange={this.props.posChange}   
            name="newPlayerPosition" 
            id="newPlayerPosition" 
            defaultValue={'DEFAULT'}
          >
            <option value="DEFAULT" disabled>Choose a position</option>
            <option>Handler</option>
            <option>Cutter</option>
            <option>Hybrid</option>
          </select>
        </span>

        <button onClick={this.props.submit}>Add new player!</button>
      </form>
      
    );
  }
}

export default AddPlayerForm;