import React, {Component} from 'react';
import Take14TilesButton from '../components/Take14TilesButton.js';
import TakeExtraTileButton from '../components/TakeExtraTileButton.js';
import EndPlayerTurnButton from '../components/EndPlayerTurnButton.js';
import TileData from '../models/TileData.js';
import TileTable from '../components/TileTable.js';
import PlayersBoard from '../components/PlayersBoard.js';
import ReadyToPlayButton from '../components/ReadyToPlayButton.js';
import BannerMessage from '../components/BannerMessage.js';

import io from 'socket.io-client';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.tileData = new TileData();

    this.state = {
      bannerMessage: "Welcome to RummyCub!",
      endPlayerTurnButtonDisabled: true,
      readyToPlayDisabled: false,
      take14TilesButtonDisabled: true,
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
    this.socket.on('changeStatusOfTakeExtraTileButton', this.changeStatusOfTakeExtraTileButton.bind(this));
    this.socket.on('changeStatusOfEndPlayerTurnButton', this.changeStatusOfEndPlayerTurnButton.bind(this));
    this.socket.on('changeBannerMessage', this.changeBannerMessage.bind(this));
    this.socket.on('endGame', this.endGame.bind(this));

    this.handleTake14TilesClick = this.handleTake14TilesClick.bind(this);
    this.handleTakeExtraTileClick = this.handleTakeExtraTileClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
    this.handleReadyToPlayClick = this.handleReadyToPlayClick.bind(this);
    this.handleEndTurnClick = this.handleEndTurnClick.bind(this);
  };

  endGame() {
    const tempState = this.state;
    tempState.readyToPlayDisabled = true;
    tempState.take14TilesButtonDisabled = true;
    tempState.takeExtraTileButtonDisabled = true,
    tempState.notPlayersTurn =  true,
    this.setState(tempState);
  };

  changeBannerMessage(message){
    const tempState = this.state;
    tempState.bannerMessage = message;
    this.setState(tempState);
  };

  changeStatusOfTakeExtraTileButton(trueOrFalse) {
    const tempState = this.state;
    tempState.takeExtraTileButtonDisabled = trueOrFalse;
    this.setState(tempState);
  };

  changeStatusOfEndPlayerTurnButton(trueOrFalse) {
    const tempState = this.state;
    tempState.endPlayerTurnButtonDisabled = trueOrFalse;
    this.setState(tempState);
  };

  setNotCurrentPlayer(trueOrFalse) {
    const tempState = this.state;
    tempState.notPlayersTurn = trueOrFalse;
    if (tempState.take14TilesButtonDisabled) {
      tempState.takeExtraTileButtonDisabled = trueOrFalse};
    this.setState(tempState);
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

  handleReadyToPlayClick() {
    const tempState = this.state;
    this.socket.emit('setFirstPlayerTurn');
    tempState.readyToPlayDisabled = true;
    tempState.take14TilesButtonDisabled = false;
    console.log('before', tempState.endPlayerTurnButtonDisabled);
    tempState.endPlayerTurnButtonDisabled = true;
    this.setState(tempState);
    console.log('after', tempState.endPlayerTurnButtonDisabled);
  };

  handleTake14TilesClick() {
    const tempState = this.state;
    this.socket.emit('getPlayersStartingTiles');
    tempState.take14TilesButtonDisabled = true;
    tempState.takeExtraTileButtonDisabled = false;
    this.setState(tempState);
  };

  handleTakeExtraTileClick() {
    console.log('before status: ', this.state.takeExtraTileButtonDisabled);
    this.socket.emit('getExtraTileFromBox');
    this.socket.emit('changePlayerTurn');
    const tempState = this.state;
    tempState.takeExtraTileButtonDisabled = true;
    tempState.endPlayerTurnButtonDisabled = true;
    this.setState(tempState);
    console.log('after status: ', this.state.takeExtraTileButtonDisabled);
  };

  handleBoardClick(event) {
    const index = event.target.value;
    this.socket.emit('handleBoardClick', index);
  };

  handleTableClick(event) {
    const index = event.target.value;
    this.socket.emit('handleTableClick', index);
    this.socket.emit('lookForAWinner');
  };

  handleEndTurnClick() {
    this.setNotCurrentPlayer(true);
    this.socket.emit('changePlayerTurn');
    const tempState = this.state;
    tempState.takeExtraTileButtonDisabled = true;
    tempState.endPlayerTurnButtonDisabled = true;
    this.setState(tempState);
  };


  render() {
    return(
      <div>
        <BannerMessage message={this.state.bannerMessage}/>
        <ReadyToPlayButton disabled={this.state.readyToPlayDisabled} handleReadyToPlayClick={this.handleReadyToPlayClick}/>
        <Take14TilesButton disabled={this.state.take14TilesButtonDisabled} handleTake14TilesClick={this.handleTake14TilesClick}/>
        <TakeExtraTileButton disabled={this.state.notPlayersTurn || this.state.takeExtraTileButtonDisabled || this.state.boxTilesRemaining === 0} handleTakeExtraTileClick={this.handleTakeExtraTileClick}/>
        <EndPlayerTurnButton disabled={this.state.endPlayerTurnButtonDisabled} handleEndTurnClick={this.handleEndTurnClick}/>
        <TileTable disabled={this.state.notPlayersTurn} tiles={this.state.tableTiles} handleTableClick={this.handleTableClick}/>
        <PlayersBoard disabled={this.state.notPlayersTurn || this.tileData.countBlankTilesOnBoard(this.state.playerTiles) === 28} tiles={this.state.playerTiles} handleBoardClick={this.handleBoardClick}/>
      </div>
    );
  };




};



export default GameContainer;
