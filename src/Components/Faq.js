import React from 'react';

const Faq = (props) => {
  return (
    <div className="faqContainer">
      <button className="faqButton">?</button>
      <aside className="faqModal">
        <div className="faqContent">
          <h2>Welcome to Ultimistics.</h2>
          <p>Ultimistics. is an ultimate frisbee statistics tracking app.</p>
          
          <h3>Getting Started</h3>
          <p>Using this app is as simple as 3 easy steps:</p>
          <ol>
          <li>Open the app at the start of a game</li>
          <li>Select your player (or add a new player)</li>
          <li>Add a new game</li>
          </ol>
          <p>And let the tracking begin!</p>
          
          <h3>Graphs</h3>
          <p>One cool feature about Ultimistics. is the graphical interface. Click "Graph" and you will see the player's stats for the current game in a graphical format. But more importantly, clicking "Last 3 Games' will allow you to see the player's progression in stats over the last three games!</p>
        </div>
      </aside>
    </div>
  );
}

export default Faq;