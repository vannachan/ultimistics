import React from 'react';

const AddPlayerForm = (props) => {
  return (
    <form action="" id="addPlayer" ref={props.addPlayerRef} className="addPlayerForm">
      <label htmlFor="newPlayerName" className="visuallyHidden">Enter new player's name</label>
      <input 
        type="text"
        name="newPlayerName" 
        id="newPlayerName"  
        onChange={props.nameChange}
        value={props.nameVal}
        placeholder="New Player Name" 
      />
      <span className="newPlayerPosDropDown dropDownContainer">
        <label htmlFor="newPlayerPosition" className="visuallyHidden">Dropdown menu for player's position</label>
        <select 
          onChange={props.posChange}   
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

      <button onClick={props.submit}>Add new player!</button>
    </form>
  );
}

export default AddPlayerForm;