import React from 'react';

const Take14TilesButton = (props) => {

  return(
    <button disabled={props.disabled} className="take14tiles-button" onClick={props.handleTake14TilesClick}>Take Starting Tiles</button>
  );

};

export default Take14TilesButton;
