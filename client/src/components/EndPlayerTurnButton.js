import React from 'react';

const EndPlayerTurnButton = (props) => {

  return(
    <button disabled={props.disabled} className="endPlayerTurn-button" onClick={props.handleEndTurnClick}>End Turn</button>
  );

};

export default EndPlayerTurnButton;
