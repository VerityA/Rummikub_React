import React from 'react';
import Tile from './Tile.js';

const TileTable = (props) => {
  const tiles = props.tiles.map((tile, index) => {
    return <Tile  disabled={props.disabled} handleClick={props.handleTableClick} className="table-tile" value={index} key={index} tileValue={tile.value} image={tile.img} colour={this.colour}/>
  });

  return(
    <div className="tile-table">
      {tiles}
    </div>
  );
};


export default TileTable;
