import React, {Component} from 'react';
import Take14TilesButton from '../components/Take14TilesButton.js';
import TakeExtraTileButton from '../components/TakeExtraTileButton.js';
import TileData from '../models/TileData.js';
import TileTable from '../components/TileTable.js';
import PlayersBoard from '../components/PlayersBoard.js';
import ServerTestButton from '../components/ServerTestButton.js';
import io from 'socket.io-client';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.tileData = new TileData();

    this.state = {
      boxTiles: this.tileData.createAllTiles(),
      tableTiles: this.tileData.createEmptyTable(),
      selectedTableTile: null,
      playerTiles: this.tileData.createEmptyPlayerBoard(),
      selectedPlayerTile: null,
    };

    this.socket = io("http://localhost:3001");
    this.socket.on('takeStartingTiles', this.getPlayersTiles.bind(this));
    this.socket.on('takeExtraTile', this.getPlayersTiles.bind(this));

    this.handleTake14TilesClick = this.handleTake14TilesClick.bind(this);
    this.handleTakeExtraTileClick = this.handleTakeExtraTileClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
    this.handleTestButtonClick = this.handleTestButtonClick.bind(this);
  };

  getPlayersTiles(tiles) {
    const tempState = this.state;
    tempState.playerTiles = tiles;
    this.setState(tempState)
  };

  handleTake14TilesClick() {
    this.socket.emit('getPlayersStartingTiles');
  };

  handleTakeExtraTileClick() {
    this.socket.emit('getExtraTileFromBox');
  };

  handleBoardClick(event) {
    const index = event.target.value;
    const emptyTile = this.tileData.createEmptyTile();
    const tempState = this.state;
    console.log(tempState.playerTiles[index].colour);
    if (tempState.playerTiles[index].colour === "z-blank"){

      if (tempState.selectedTableTile) {
        tempState.playerTiles.splice(index, 1, tempState.selectedTableTile);
        tempState.selectedTableTile = null;
      }
      else if (tempState.selectedPlayerTile) {
        console.log(index);
        tempState.playerTiles.splice(index, 1, tempState.selectedPlayerTile);
        tempState.selectedPlayerTile = null;
      }
      else  return;

    } else if (tempState.selectedTableTile || tempState.selectedPlayerTile) {
      return;
    } else {
      tempState.selectedPlayerTile = tempState.playerTiles[index];
      tempState.playerTiles.splice(index, 1, emptyTile);
      // tempState.playerTiles = this.tileData.sortTilesByColourThenValue(tempState.playerTiles);
    };

    this.setState(tempState);
  };

  handleTableClick(event) {
    const index = event.target.value;
    const emptyTile = this.tileData.createEmptyTile();

    const tempState = this.state;

    console.log(tempState.tableTiles[index].colour === "z-blank");
    console.log(tempState.selectedTableTile);

    if (tempState.tableTiles[index].colour === "z-blank" && tempState.selectedPlayerTile) {
      tempState.tableTiles.splice(index, 1, tempState.selectedPlayerTile);
      tempState.selectedPlayerTile = null;
    }
    else if(tempState.tableTiles[index].colour !== "z-blank") {
      if (tempState.selectedPlayerTile ||tempState.selectedTableTile) return;
      tempState.selectedTableTile = tempState.tableTiles[index];
      tempState.tableTiles.splice(index, 1, emptyTile);
    }
    else if (tempState.selectedTableTile) {
      tempState.tableTiles.splice(index, 1, tempState.selectedTableTile);
      tempState.selectedTableTile = null;
    };


    this.setState(tempState);
  };

  handleTestButtonClick() {
    this.socket.emit('playerID');
  };

  render() {
    return(
      <div>
        <ServerTestButton handleTestButtonClick={this.handleTestButtonClick}/>
        <Take14TilesButton disabled={this.state.playerTiles[0].colour !== "z-blank"} handleTake14TilesClick={this.handleTake14TilesClick}/>
        <TakeExtraTileButton disabled={this.state.boxTiles.length === 0 || this.state.playerTiles[0].colour === "z-blank"} handleTakeExtraTileClick={this.handleTakeExtraTileClick}/>
        <TileTable tiles={this.state.tableTiles} handleTableClick={this.handleTableClick}/>
        <PlayersBoard tiles={this.state.playerTiles} handleBoardClick={this.handleBoardClick}/>
      </div>
    );
  };




};



export default GameContainer;
