const TileData = require('../../client/src/models/TileData.js')

class GameLogic {
  constructor() {
    this.tileData = new TileData();

    this.boxTiles =  this.tileData.createAllTiles(),
    this.tableTiles = this.tileData.createEmptyTable(),

    this.selectedTableTile = null;
    this.selectedPlayer1Tile = null;
    this.selectedPlayer2Tile = null;

    this.player1ID = null;
    this.player2ID = null;

    this.currentPlayer = null;

    this.player1Tiles = null;
    this.player2Tiles = null;

    this.noTilesOnPlayer1BoardLastGo = 14;
    this.noTilesOnPlayer2BoardLastGo = 14;

    this.winner = null;
  };

  checkForAWin(playerID) {
    if(this.player1ID === playerID && this.countNoActiveTilesOnBoard(this.player1Tiles) === 0) {
      this.winner = this.player1ID;
    } else if (this.player2ID === playerID && this.countNoActiveTilesOnBoard(this.player2Tiles) === 0) {
      this.winner = this.player2ID;
    };
  };

  countNoActiveTilesOnBoard(board) {
    return this.tileData.countColouredTilesOnBoard(board);
  };

  addNewPlayer(playerID) {
    if (!this.player1ID) {
      this.player1ID = playerID;
    } else if (!this.player2ID){
      this.player2ID = playerID;
    };
  };

  setCurrentPlayer(playerID) {
    if (!this.currentPlayer && this.player1ID) {
      this.currentPlayer = this.player1ID;
    } else return;
  };

  setNoTilesOnBoardLastGo(playerID) {
    if (this.player1ID === playerID) {
      this.noTilesOnPlayer1BoardLastGo = this.tileData.countColouredTilesOnBoard(this.player1Tiles);
    } else {this.noTilesOnPlayer2BoardLastGo = this.tileData.countColouredTilesOnBoard(this.player2Tiles);;
    };
  };

  changeCurrentPlayer() {
    if (this.currentPlayer === this.player1ID) {
      this.currentPlayer = this.player2ID;
    } else {
      this.currentPlayer = this.player1ID;
    };
  };

  getExtraTileFromBox(socketID) {
    const takeTileObject = this.tileData.getExtraTileFromBox(this.boxTiles)
    this.boxTiles = takeTileObject.remainingBox;

    const extraTile = takeTileObject.extraTile;
    console.log('test', this.player1ID === socketID);

    if (this.player1ID === socketID) {
      const indexToInsert = this.tileData.findIndexOfFirstEmptyTile(this.player1Tiles);
      this.player1Tiles.splice(indexToInsert, 1, extraTile);
    } else {
      const indexToInsert = this.tileData.findIndexOfFirstEmptyTile(this.player2Tiles);
      this.player2Tiles.splice(indexToInsert, 1, extraTile);
    };
  };

  getStartingTiles(socketID) {
    const takeTilesObject = this.tileData.getStartingTilesFromBox(this.boxTiles)
    this.boxTiles = takeTilesObject.remainingBox;

    if (this.player1ID === socketID && !this.player1Tiles) {
      this.player1Tiles = takeTilesObject.startingTiles;
    } else if (this.player2ID === socketID && !this.player2Tiles){
      this.player2Tiles = takeTilesObject.startingTiles;
    };
  };

  handleTableAction(socketID, index) {
    const emptyTile = this.tileData.createEmptyTile();

    console.log('did player one click: ', (this.player1ID === socketID));
    console.log('did player two click: ', (this.player2ID === socketID));

    console.log('selectedTableTile colour: ', this.tableTiles[index].colour);

    console.log('selectedPlayer1Tile:', this.selectedPlayer1Tile);
    console.log('selectedPlayer2Tile:', this.selectedPlayer2Tile);


    console.log('is tableTile blank and there is a selected player2 tile: ', (this.tableTiles.colour === "z-blank" && this.selectedPlayer2Tile));

    if (this.player1ID === socketID) {
      if (this.tableTiles[index].colour === "z-blank" && this.selectedPlayer1Tile) {
        this.tableTiles.splice(index, 1, this.selectedPlayer1Tile);
        this.selectedPlayer1Tile = null;
      }
      else if(this.tableTiles[index].colour !== "z-blank") {
        if (this.selectedPlayer1Tile ||this.selectedTableTile) return;
        this.selectedTableTile = this.tableTiles[index];
        this.tableTiles.splice(index, 1, emptyTile);
      }
      else if (this.selectedTableTile) {
        this.tableTiles.splice(index, 1, this.selectedTableTile);
        this.selectedTableTile = null;
      }
    } else {
      if (this.tableTiles[index].colour === "z-blank" && this.selectedPlayer2Tile) {
        this.tableTiles.splice(index, 1, this.selectedPlayer2Tile);
        this.selectedPlayer2Tile = null;
      }
      else if(this.tableTiles[index].colour !== "z-blank") {
        if (this.selectedPlayer2Tile ||this.selectedTableTile) return;
        this.selectedTableTile = this.tableTiles[index];
        this.tableTiles.splice(index, 1, emptyTile);
      }
      else if (this.selectedTableTile) {
        this.tableTiles.splice(index, 1, this.selectedTableTile);
        this.selectedTableTile = null;
      };
    };

  };


  handleBoardAction(socketID, index) {
    const emptyTile = this.tileData.createEmptyTile();

    if (this.player1ID === socketID) {
      if (this.player1Tiles[index].colour === "z-blank"){
        if (this.selectedTableTile) {
          this.player1Tiles.splice(index, 1, this.selectedTableTile);
          this.selectedTableTile = null;
        }
        else if (this.selectedPlayer1Tile) {
          this.player1Tiles.splice(index, 1, this.selectedPlayer1Tile);
          this.selectedPlayer1Tile = null;
        }
        else  return;

      } else if (this.selectedTableTile || this.selectedPlayer1Tile) {
        return;
      } else {
        this.selectedPlayer1Tile = this.player1Tiles[index];
        this.player1Tiles.splice(index, 1, emptyTile);
      }
    }
    else {
      if (this.player2Tiles[index].colour === "z-blank"){
        if (this.selectedTableTile) {
          this.player2Tiles.splice(index, 1, this.selectedTableTile);
          this.selectedTableTile = null;
        }
        else if (this.selectedPlayer2Tile) {
          this.player2Tiles.splice(index, 1, this.selectedPlayer2Tile);
          this.selectedPlayer2Tile = null;
        }
        else  return;

      } else if (this.selectedTableTile || this.selectedPlayer2Tile) {
        return;
      } else {
        this.selectedPlayer2Tile = this.player2Tiles[index];
        this.player2Tiles.splice(index, 1, emptyTile);
      };
    };
  };


};


module.exports = GameLogic;
