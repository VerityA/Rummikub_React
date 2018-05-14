const TileData = require('../../client/src/models/TileData.js')

class GameLogic {
  constructor() {
    this.tileData = new TileData();

    this.boxTiles =  this.tileData.createAllTiles(),
    this.tableTiles = this.tileData.createEmptyTable(),

    this.player1ID = null;
    this.player2ID = null;

    this.player1Tiles = null;
    this.player2Tiles = null;
  };

  addNewPlayer(playerID) {
    if (!this.player1ID) {
      this.player1ID = playerID;
    } else if (!this.player2ID){
      this.player2ID = playerID;
    };
  };

  getExtraTileFromBox(socketID) {
    const takeTileObject = this.tileData.getExtraTileFromBox(this.boxTiles)
    this.boxTiles = takeTileObject.remainingBox;

    const extraTile = takeTileObject.extraTile;

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


};


module.exports = GameLogic;
