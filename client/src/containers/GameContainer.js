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
    this.socket.on('showPlayerBoardTiles', this.getPlayersTiles.bind(this));
    this.socket.on('showTableTiles', this.getTableTiles.bind(this));

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

  getTableTiles(tiles) {
    const tempState = this.state;
    tempState.tableTiles = tiles;
    this.setState(tempState)
  };

  handleTake14TilesClick() {
    this.socket.emit('getPlayersStartingTiles');
  };

  handleTakeExtraTileClick() {
    this.socket.emit('getExtraTileFromBox');
  };

  showResultOfBoardAction(playerTiles, tableTiles) {
    console.log("TESTING");
    this.getPlayersTiles(playerTiles);
    this.getTableTiles(tableTiles);
  };

  handleBoardClick(event) {
    const index = event.target.value;
    this.socket.emit('handleBoardClick', index);
  };

  handleTableClick(event) {
    const index = event.target.value;
    this.socket.emit('handleTableClick', index);
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
