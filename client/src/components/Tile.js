import React from 'react';

const Tile = (props) => {
  return(
        <input onClick={props.handleClick} className={props.className} value={props.value} type="image" src={props.image} value={props.value} colour={props.colour}></input>
  );
};


export default Tile;
