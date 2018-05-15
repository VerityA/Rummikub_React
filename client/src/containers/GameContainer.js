import React, {Component} from 'react';
import Take14TilesButton from '../components/Take14TilesButton.js';
import TakeExtraTileButton from '../components/TakeExtraTileButton.js';
import EndPlayerTurnButton from '../components/EndPlayerTurnButton.js';
import TileData from '../models/TileData.js';
import TileTable from '../components/TileTable.js';
import PlayersBoard from '../components/PlayersBoard.js';
import ReadyToPlayButton from '../components/ReadyToPlayButton.js';

import io from 'socket.io-client';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.tileData = new TileData();

    this.state = {
      readyToPlayDisabled: false,
      take14TilesButtonDisabled: false,
      takeExtraTileButtonDisabled: true,
      notPlayersTurn: true,
      boxTilesRemaining: 98,
      tableTiles: this.tileData.createEmptyTable(),
      selectedTableTile: null,
      playerTiles: this.tileData.createEmptyPlayerBoard(),
      selectedPlayerTile: null,
    };


    this.socket = io.connect("http://localhost:3001");
    this.socket.on('takeStartingTiles', this.getPlayersTiles.bind(this));
    this.socket.on('takeExtraTile', this.getPlayersTiles.bind(this));
    this.socket.on('showPlayerBoardTiles', this.getPlayersTiles.bind(this));
    this.socket.on('showTableTiles', this.getTableTiles.bind(this));
    this.socket.on('noTilesRemaining', this.getNoBoxTilesRemaining.bind(this));
    this.socket.on('setNotCurrentPlayer', this.setNotCurrentPlayer.bind(this));

    this.handleTake14TilesClick = this.handleTake14TilesClick.bind(this);
    this.handleTakeExtraTileClick = this.handleTakeExtraTileClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
    this.handleReadyToPlayClick = this.handleReadyToPlayClick.bind(this);
    this.handleEndTurnClick = this.handleEndTurnClick.bind(this);


    console.log('test', this.state.take14TilesButtonDisabled );
    console.log('part 2', this.state.boxTilesRemaining === 0 );
    console.log('is take extra tile button set to disabled? ', this.state.takeExtraTileButtonDisabled || this.state.boxTilesRemaining === 0);
  };

  setNotCurrentPlayer(trueOrFalse) {
    const tempState = this.state;
    tempState.notPlayersTurn = trueOrFalse;
    tempState.takeExtraTileButtonDisabled = trueOrFalse;
    this.setState(tempState);
  };

  getPlayersTiles(tiles) {
    console.log('HELLOOOOO');
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

  handleReadyToPlayClick() {
    const tempState = this.state;
    this.socket.emit('setFirstPlayerTurn');
    tempState.readyToPlayDisabled = true;
    this.setState(tempState);
  };

  handleTake14TilesClick() {
    const tempState = this.state;
    this.socket.emit('getPlayersStartingTiles');
    tempState.take14TilesButtonDisabled = true;
    tempState.takeExtraTileButtonDisabled = false;
    this.setState(tempState);
    console.log('Hello David!');
  };

  handleTakeExtraTileClick() {
    this.socket.emit('getExtraTileFromBox');
    const tempState = this.state;
    tempState.takeExtraTileButtonDisabled = true;
    this.setState(tempState);
  };

  handleBoardClick(event) {
    const index = event.target.value;
    this.socket.emit('handleBoardClick', index);
  };

  handleTableClick(event) {
    const index = event.target.value;
    this.socket.emit('handleTableClick', index);
  };

  handleEndTurnClick() {
    this.setNotCurrentPlayer(true);
    this.socket.emit('changePlayerTurn');
    const tempState = this.state;
    tempState.takeExtraTileButtonDisabled = true;
    this.setState(tempState);
  };


  render() {
    return(
      <div>
        <ReadyToPlayButton disabled={this.state.readyToPlayDisabled} handleReadyToPlayClick={this.handleReadyToPlayClick}/>
        <Take14TilesButton disabled={this.state.take14TilesButtonDisabled} handleTake14TilesClick={this.handleTake14TilesClick}/>
        <TakeExtraTileButton disabled={this.state.notPlayersTurn || this.state.takeExtraTileButtonDisabled || this.state.boxTilesRemaining === 0} handleTakeExtraTileClick={this.handleTakeExtraTileClick}/>
        <EndPlayerTurnButton disabled={this.state.notPlayersTurn} handleEndTurnClick={this.handleEndTurnClick}/>
        <TileTable disabled={this.state.notPlayersTurn} tiles={this.state.tableTiles} handleTableClick={this.handleTableClick}/>
        <PlayersBoard disabled={this.state.notPlayersTurn || this.tileData.countBlankTilesOnBoard(this.state.playerTiles) === 28} tiles={this.state.playerTiles} handleBoardClick={this.handleBoardClick}/>
      </div>
    );
  };




};



export default GameContainer;
