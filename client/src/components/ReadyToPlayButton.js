import React from 'react';

const ReadyToPlayButton = (props) => {

  return(
    <button disabled={props.disabled} className="readyToPlay-button" onClick={props.handleReadyToPlayClick}>Ready to Play?</button>
  );

};

export default ReadyToPlayButton;
