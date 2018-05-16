import React from 'react';
import Tile from './Tile.js';

const PlayersBoard = (props) => {
  const tiles = props.tiles.map((tile, index) => {
    return <Tile handleClick={props.handleBoardClick} className="player-tile" value={index} key={index} tileValue={tile.value} image={tile.img} colour={this.colour}/>
  });

  return(
    <div className="players-table">
      {tiles}
    </div>
  );
};


export default PlayersBoard;
