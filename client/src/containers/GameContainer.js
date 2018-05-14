import React, {Component} from 'react';
import Take14TilesButton from '../components/Take14TilesButton.js';
import TakeExtraTileButton from '../components/TakeExtraTileButton.js';
import TileData from '../models/TileData.js';
import TileTable from '../components/TileTable.js';
import PlayersBoard from '../components/PlayersBoard.js';

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.tileData = new TileData();

    this.state = {
      boxTiles: this.tileData.createAllTiles(),
      tableTiles: this.tileData.createEmptyTable(),
      selectedTableTile: null,
      player1Tiles: this.tileData.createEmptyPlayerBoard(),
      selectedPlayer1Tile: null,
      player2Tiles: [],
      player3Tiles: [],
      player4Tiles: []
    };

    // this.socket = io("http://localhost:3001");

    this.handleTake14TilesClick = this.handleTake14TilesClick.bind(this);
    this.handleTakeExtraTileClick = this.handleTakeExtraTileClick.bind(this);
    this.handleBoardClick = this.handleBoardClick.bind(this);
    this.handleTableClick = this.handleTableClick.bind(this);
  };



  handleTake14TilesClick() {
    const tempState = this.state;
    const clickResult = this.tileData.getStartingTilesFromBox(this.state.boxTiles)
    const startingTiles = clickResult.startingTiles;

    const remainingBox = clickResult.remainingBox;

    tempState.player1Tiles.splice(0, 14);
    tempState.player1Tiles = startingTiles.concat(this.state.player1Tiles);

    tempState.boxTiles = remainingBox;
    this.setState(tempState);
  };

  handleTakeExtraTileClick() {
    console.log(this.state.player1Tiles);
    const tempState = this.state;
    const clickResult = this.tileData.getExtraTileFromBox(tempState.boxTiles)

    const extraTile = clickResult.extraTile;
    const remainingBox = clickResult.remainingBox;

    const noOfActiveTiles = tempState.player1Tiles.length - this.tileData.countBlankTilesOnBoard(tempState.player1Tiles);

    tempState.player1Tiles.splice(noOfActiveTiles , 1, extraTile);

    tempState.player1Tiles = this.tileData.sortTilesByColourThenValue(tempState.player1Tiles);

    tempState.boxTiles = remainingBox;
    this.setState(tempState);
  };

  handleBoardClick(event) {
    const index = event.target.value;
    const emptyTile = this.tileData.createEmptyTile();
    const tempState = this.state;
    console.log(tempState.player1Tiles[index].colour);
    if (tempState.player1Tiles[index].colour === "z-blank"){

      if (tempState.selectedTableTile) {
        tempState.player1Tiles.splice(index, 1, tempState.selectedTableTile);
        tempState.selectedTableTile = null;
      }
      else if (tempState.selectedPlayer1Tile) {
        console.log(index);
        tempState.player1Tiles.splice(index, 1, tempState.selectedPlayer1Tile);
        tempState.selectedPlayer1Tile = null;
      }
      else  return;

    } else if (tempState.selectedTableTile || tempState.selectedPlayer1Tile) {
      return;
    } else {
      tempState.selectedPlayer1Tile = tempState.player1Tiles[index];
      tempState.player1Tiles.splice(index, 1, emptyTile);
      // tempState.player1Tiles = this.tileData.sortTilesByColourThenValue(tempState.player1Tiles);
    };

    this.setState(tempState);
  };

  handleTableClick(event) {
    const index = event.target.value;
    const emptyTile = this.tileData.createEmptyTile();

    const tempState = this.state;

    console.log(tempState.tableTiles[index].colour === "z-blank");
    console.log(tempState.selectedTableTile);

    if (tempState.tableTiles[index].colour === "z-blank" && tempState.selectedPlayer1Tile) {
      tempState.tableTiles.splice(index, 1, tempState.selectedPlayer1Tile);
      tempState.selectedPlayer1Tile = null;
    }
    else if(tempState.tableTiles[index].colour !== "z-blank") {
      if (tempState.selectedPlayer1Tile ||tempState.selectedTableTile) return;
      tempState.selectedTableTile = tempState.tableTiles[index];
      tempState.tableTiles.splice(index, 1, emptyTile);
    }
    else if (tempState.selectedTableTile) {
      tempState.tableTiles.splice(index, 1, tempState.selectedTableTile);
      tempState.selectedTableTile = null;
    };


    this.setState(tempState);
  };

  render() {
    return(
      <div>
        <Take14TilesButton disabled={this.state.player1Tiles[0].colour !== "z-blank"} handleTake14TilesClick={this.handleTake14TilesClick}/>
        <TakeExtraTileButton disabled={this.state.boxTiles.length === 0 || this.state.player1Tiles[0].colour === "z-blank"} handleTakeExtraTileClick={this.handleTakeExtraTileClick}/>
        <TileTable tiles={this.state.tableTiles} handleTableClick={this.handleTableClick}/>
        <PlayersBoard tiles={this.state.player1Tiles} handleBoardClick={this.handleBoardClick}/>
      </div>
    );
  };




};



export default GameContainer;
