const assert = require('assert');
const TileData = require('../src/models/TileData.js');


describe('TileData', function() {
  let data;

  beforeEach(function() {
    data = new TileData();
  });

  it('should add all tiles into box', function() {
    const allTiles = [
      {colour: "blue", value: 1, img: './images/blue_1.png'},
      {colour: "blue", value: 2, img: './images/blue_2.png'},
      {colour: "blue", value: 3, img: './images/blue_3.png'},
      {colour: "blue", value: 4, img: './images/blue_4.png'},
      {colour: "blue", value: 5, img: './images/blue_5.png'},
      {colour: "blue", value: 6, img: './images/blue_6.png'},
      {colour: "blue", value: 7, img: './images/blue_7.png'},
      {colour: "blue", value: 8, img: './images/blue_8.png'},
      {colour: "blue", value: 9, img: './images/blue_9.png'},
      {colour: "blue", value: 10, img: './images/blue_10.png'},
      {colour: "blue", value: 11, img: './images/blue_11.png'},
      {colour: "blue", value: 12, img: './images/blue_12.png'},
      {colour: "blue", value: 1, img: './images/blue_1.png'},
      {colour: "blue", value: 2, img: './images/blue_2.png'},
      {colour: "blue", value: 3, img: './images/blue_3.png'},
      {colour: "blue", value: 4, img: './images/blue_4.png'},
      {colour: "blue", value: 5, img: './images/blue_5.png'},
      {colour: "blue", value: 6, img: './images/blue_6.png'},
      {colour: "blue", value: 7, img: './images/blue_7.png'},
      {colour: "blue", value: 8, img: './images/blue_8.png'},
      {colour: "blue", value: 9, img: './images/blue_9.png'},
      {colour: "blue", value: 10, img: './images/blue_10.png'},
      {colour: "blue", value: 11, img: './images/blue_11.png'},
      {colour: "blue", value: 12, img: './images/blue_12.png'},
      {colour: "red", value: 1, img: './images/red_1.png'},
      {colour: "red", value: 2, img: './images/red_2.png'},
      {colour: "red", value: 3, img: './images/red_3.png'},
      {colour: "red", value: 4, img: './images/red_4.png'},
      {colour: "red", value: 5, img: './images/red_5.png'},
      {colour: "red", value: 6, img: './images/red_6.png'},
      {colour: "red", value: 7, img: './images/red_7.png'},
      {colour: "red", value: 8, img: './images/red_8.png'},
      {colour: "red", value: 9, img: './images/red_9.png'},
      {colour: "red", value: 10, img: './images/red_10.png'},
      {colour: "red", value: 11, img: './images/red_11.png'},
      {colour: "red", value: 12, img: './images/red_12.png'},
      {colour: "red", value: 1, img: './images/red_1.png'},
      {colour: "red", value: 2, img: './images/red_2.png'},
      {colour: "red", value: 3, img: './images/red_3.png'},
      {colour: "red", value: 4, img: './images/red_4.png'},
      {colour: "red", value: 5, img: './images/red_5.png'},
      {colour: "red", value: 6, img: './images/red_6.png'},
      {colour: "red", value: 7, img: './images/red_7.png'},
      {colour: "red", value: 8, img: './images/red_8.png'},
      {colour: "red", value: 9, img: './images/red_9.png'},
      {colour: "red", value: 10, img: './images/red_10.png'},
      {colour: "red", value: 11, img: './images/red_11.png'},
      {colour: "red", value: 12, img: './images/red_12.png'},
      {colour: "orange", value: 1, img: './images/orange_1.png'},
      {colour: "orange", value: 2, img: './images/orange_2.png'},
      {colour: "orange", value: 3, img: './images/orange_3.png'},
      {colour: "orange", value: 4, img: './images/orange_4.png'},
      {colour: "orange", value: 5, img: './images/orange_5.png'},
      {colour: "orange", value: 6, img: './images/orange_6.png'},
      {colour: "orange", value: 7, img: './images/orange_7.png'},
      {colour: "orange", value: 8, img: './images/orange_8.png'},
      {colour: "orange", value: 9, img: './images/orange_9.png'},
      {colour: "orange", value: 10, img: './images/orange_10.png'},
      {colour: "orange", value: 11, img: './images/orange_11.png'},
      {colour: "orange", value: 12, img: './images/orange_12.png'},
      {colour: "orange", value: 1, img: './images/orange_1.png'},
      {colour: "orange", value: 2, img: './images/orange_2.png'},
      {colour: "orange", value: 3, img: './images/orange_3.png'},
      {colour: "orange", value: 4, img: './images/orange_4.png'},
      {colour: "orange", value: 5, img: './images/orange_5.png'},
      {colour: "orange", value: 6, img: './images/orange_6.png'},
      {colour: "orange", value: 7, img: './images/orange_7.png'},
      {colour: "orange", value: 8, img: './images/orange_8.png'},
      {colour: "orange", value: 9, img: './images/orange_9.png'},
      {colour: "orange", value: 10, img: './images/orange_10.png'},
      {colour: "orange", value: 11, img: './images/orange_11.png'},
      {colour: "orange", value: 12, img: './images/orange_12.png'},
      {colour: "black", value: 1, img: './images/black_1.png'},
      {colour: "black", value: 2, img: './images/black_2.png'},
      {colour: "black", value: 3, img: './images/black_3.png'},
      {colour: "black", value: 4, img: './images/black_4.png'},
      {colour: "black", value: 5, img: './images/black_5.png'},
      {colour: "black", value: 6, img: './images/black_6.png'},
      {colour: "black", value: 7, img: './images/black_7.png'},
      {colour: "black", value: 8, img: './images/black_8.png'},
      {colour: "black", value: 9, img: './images/black_9.png'},
      {colour: "black", value: 10, img: './images/black_10.png'},
      {colour: "black", value: 11, img: './images/black_11.png'},
      {colour: "black", value: 12, img: './images/black_12.png'},
      {colour: "black", value: 1, img: './images/black_1.png'},
      {colour: "black", value: 2, img: './images/black_2.png'},
      {colour: "black", value: 3, img: './images/black_3.png'},
      {colour: "black", value: 4, img: './images/black_4.png'},
      {colour: "black", value: 5, img: './images/black_5.png'},
      {colour: "black", value: 6, img: './images/black_6.png'},
      {colour: "black", value: 7, img: './images/black_7.png'},
      {colour: "black", value: 8, img: './images/black_8.png'},
      {colour: "black", value: 9, img: './images/black_9.png'},
      {colour: "black", value: 10, img: './images/black_10.png'},
      {colour: "black", value: 11, img: './images/black_11.png'},
      {colour: "black", value: 12, img: './images/black_12.png'},
      {colour: "wild", value: 0, img: './images/wild.png'},
      {colour: "wild", value: 0, img: './images/wild.png'}
    ];
    const result = data.createAllTiles();
    assert.deepStrictEqual(result, allTiles);
  });

  it('should sort all tiles by colour then value', function() {
    const tilesToSort = [
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "orange", value: 10, img: "./images/orange_10.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"}
    ];

    const sortedTiles = [
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "orange", value: 10, img: "./images/orange_10.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"}
    ];

    const result = data.sortTilesByColourThenValue(tilesToSort);

    assert.deepStrictEqual(result, sortedTiles);
  });

  it('should sort remove tiles from box', function() {
    const boxTiles = [
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "orange", value: 10, img: "./images/orange_10.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"}
    ];

    const tileToRemove = {colour: "orange", value: 10, img: "./images/orange_10.png"};

    const tilesRemaining = [
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"}
    ]

    const result = data.removeTileFromBox(tileToRemove, boxTiles);

    assert.deepStrictEqual(result, tilesRemaining);
  });

  it('should take 14 tiles from box', function() {
    const boxTiles = [
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "orange", value: 10, img: "./images/orange_10.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"},
      {colour: "orange", value: 8, img: "./images/orange_8.png"},
      {colour: "black", value: 10, img: "./images/black_10.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 12, img: "./images/blue_12.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 2, img: "./images/orange_2.png"},
      {colour: "orange", value: 10, img: "./images/orange_10.png"},
      {colour: "blue", value: 7, img: "./images/blue_7.png"},
      {colour: "orange", value: 5, img: "./images/orange_5.png"},
      {colour: "orange", value: 1, img: "./images/orange_1.png"},
      {colour: "orange", value: 9, img: "./images/orange_9.png"},
      {colour: "red", value: 12, img: "./images/red_12.png"},
      {colour: "red", value: 6, img: "./images/red_6.png"},
      {colour: "red", value: 2, img: "./images/red_2.png"}
    ];

    assert.strictEqual(boxTiles.length, 28);
    const object = data.getStartingTilesFromBox(boxTiles);
    const startingTiles = object.startingTiles;
    const remainingBoxTiles = object.remainingBox;
    assert.strictEqual(boxTiles.length, 14);
    assert.strictEqual(startingTiles.length, 28);
  });

  it('should create emptyTable on start', function() {
    const result = data.createEmptyTable();
    assert.strictEqual(result.length, 126);
  });

  it('should create emptyPlayerBoard on start', function() {
    const result = data.createEmptyPlayerBoard();
    assert.strictEqual(result.length, 28);
  });


    it('can count number of blank tiles on player board', function() {
      const board = [
        {colour: "z-blank", value: 0, img: "./images/blank_tile.png"},
        {colour: "orange", value: 1, img: "./images/orange_1.png"},
        {colour: "orange", value: 9, img: "./images/orange_9.png"},
        {colour: "red", value: 12, img: "./images/red_12.png"},
        {colour: "z-blank", value: 0, img: "./images/blank_tile.png"},
        {colour: "red", value: 6, img: "./images/red_6.png"},
        {colour: "z-blank", value: 0, img: "./images/blank_tile.png"},
        {colour: "red", value: 2, img: "./images/red_2.png"}
      ];
      const result = data.countBlankTilesOnBoard(board);
      assert.strictEqual(result, 3);
    });

    it('can find index of first empty tile on board', function() {
      const board = [
        {colour: "orange", value: 1, img: "./images/orange_1.png"},
        {colour: "z-blank", value: 0, img: "./images/blank_tile.png"},
        {colour: "red", value: 12, img: "./images/red_12.png"},
        {colour: "red", value: 6, img: "./images/red_6.png"},
        {colour: "red", value: 2, img: "./images/red_2.png"}
      ];
      const result = data.findIndexOfFirstEmptyTile(board);
      assert.strictEqual(result, 1);
    });



});
