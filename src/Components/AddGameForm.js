import React from 'react';

const AddGameForm = (props) => {
  return(
    <form action="" id="addGame">
      <label htmlFor="newGameTitle" className="visuallyHidden">Enter game name</label>
      <input 
        type="text" 
        onChange={props.gameChange}
        value={props.gameVal}
        placeholder="Game Title" 
        id="newGameTitle"
        name="newGameTitle"
      />

      <button onClick={props.submit}>Add new game!</button>
    </form>
    
  );
}

export default AddGameForm;