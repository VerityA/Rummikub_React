import React from 'react';

const TakeExtraTileButton = (props) => {

  return(
    <button disabled={props.disabled} className="takeextratile-button" onClick={props.handleTakeExtraTileClick}>Take Another Tile</button>
  );

};

export default TakeExtraTileButton;
