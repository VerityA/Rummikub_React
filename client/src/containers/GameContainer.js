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
      take14TilesButtonDisabled: false,
      takeExtraTileButtonDisabled: true,
      boxTilesRemaining: 98,
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
    this.socket.on('noTilesRemaining', this.getNoBoxTilesRemaining.bind(this));

    this.handleTake14TilesClick = this.handleTake14TilesClick.bind(this);
    this.handleTakeExtraTileClick = this.handleTakeExtraTileClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
    this.handleTestButtonClick = this.handleTestButtonClick.bind(this);

    console.log('test', this.state.take14take14TilesButtonDisabled );
    console.log('part 2', this.state.boxTilesRemaining === 0 );
    console.log('is take extra tile button set to disabled? ', this.state.takeExtraTileButtonDisabled || this.state.boxTilesRemaining === 0);
  };

  getPlayersTiles(tiles) {
    const tempState = this.state;
    tempState.playerTiles = tiles;
    this.setState(tempState);
  };

  getTableTiles(tiles) {
    const tempState = this.state;
    tempState.tableTiles = tiles;
    this.setState(tempState);
  };

  getNoBoxTilesRemaining(length) {
    const tempState = this.state;
    tempState.boxTilesRemaining = length;
    this.setState(tempState);
  };

  handleTake14TilesClick() {
    const tempState = this.state;
    this.socket.emit('getPlayersStartingTiles');
    tempState.take14TilesButtonDisabled = true;
    tempState.takeExtraTileButtonDisabled = false;
    this.setState(tempState);
    console.log('take14Tiles button:',this.state.take14take14TilesButtonDisabled);
  };

  handleTakeExtraTileClick() {
    this.socket.emit('getExtraTileFromBox');
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
        <Take14TilesButton disabled={this.state.take14TilesButtonDisabled} handleTake14TilesClick={this.handleTake14TilesClick}/>
        <TakeExtraTileButton disabled={this.state.takeExtraTileButtonDisabled || this.state.boxTilesRemaining === 0} handleTakeExtraTileClick={this.handleTakeExtraTileClick}/>
        <TileTable tiles={this.state.tableTiles} handleTableClick={this.handleTableClick}/>
        <PlayersBoard tiles={this.state.playerTiles} handleBoardClick={this.handleBoardClick}/>
      </div>
    );
  };




};



export default GameContainer;
