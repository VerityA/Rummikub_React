const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);
const GameLogic = require('./models/GameLogic.js');

const gameLogic = new GameLogic();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', socket => {
  gameLogic.addNewPlayer(socket.id)

  console.log('player1 ID: ', gameLogic.player1ID);
  console.log('player2 ID: ', gameLogic.player2ID);
  console.log('player 1 tiles: ', gameLogic.player1Tiles);
  console.log('player 2 tiles: ', gameLogic.player2Tiles);

  console.log('socketID', socket.id);
  console.log('player1ID', gameLogic.player1ID);
  console.log('is socketID equal to player1ID?', socket.id === gameLogic.player1ID);


  console.log('currentPlayer:', gameLogic.currentPlayer);

  socket.on('setFirstPlayerTurn', () => {
    gameLogic.setCurrentPlayer();
    console.log('currentPlayer', gameLogic.currentPlayer);
    if (socket.id === gameLogic.player1ID){
      socket.emit('setNotCurrentPlayer', false);
      socket.emit('changeBannerMessage', "Welcome Player 1 ...  Take your turn... ");
    } else {
      socket.emit('changeBannerMessage', "Welcome Player 2 ...  Waiting for Player 1 to make the first move... ");
      // socket.setTimeOut(socket.emit('changeBannerMessage', " Waiting for your opponent to take their turn ..."), 2000);
    }
  });

  socket.on('changePlayerTurn', () => {
    gameLogic.changeCurrentPlayer();
    gameLogic.setNoTilesOnBoardLastGo(socket.id);

    if (socket.id === gameLogic.currentPlayer) {
      socket.emit('setNotCurrentPlayer', false);
      socket.broadcast.emit('setNotCurrentPlayer', true);

    } else {
      socket.emit('setNotCurrentPlayer', true);
      socket.broadcast.emit('setNotCurrentPlayer', false);
    };

    socket.broadcast.emit('changeBannerMessage', "It's your turn! Press 'End Turn' when you're done ...");
    socket.emit('changeBannerMessage', " Waiting for your opponent to take their turn ...");
  });

  socket.on('getPlayersStartingTiles', () => {
    console.log('socketID', socket.id);
    console.log('is socketID equal to player1ID?', socket.id === gameLogic.player1ID);
    console.log('before player 1 tiles: ', gameLogic.player1Tiles);
    gameLogic.getStartingTiles(socket.id);
    console.log('after player 1 tiles: ', gameLogic.player1Tiles);
    if (socket.id === gameLogic.player1ID){
      socket.emit('takeStartingTiles', gameLogic.player1Tiles)
    } else if (socket.id === gameLogic.player2ID){
      socket.emit('takeStartingTiles', gameLogic.player2Tiles)
    } else return;

    console.log('player 1 tiles: ', gameLogic.player1Tiles);
    console.log('player 2 tiles: ', gameLogic.player2Tiles);
    console.log('remaining tiles', gameLogic.boxTiles.length);
  });

  socket.on('getExtraTileFromBox', () => {
    if (socket.id !== gameLogic.player1ID && socket.id !== gameLogic.player2ID) return;

    gameLogic.getExtraTileFromBox(socket.id);

    if (socket.id === gameLogic.player1ID){
      socket.emit('takeExtraTile', gameLogic.player1Tiles);
    } else if (socket.id === gameLogic.player2ID){
      socket.emit('takeExtraTile', gameLogic.player2Tiles);
    } else return;
    io.sockets.emit('noTilesRemaining', gameLogic.boxTiles.length);
    console.log('player 1 tiles: ', gameLogic.player1Tiles);
    console.log('player 2 tiles: ', gameLogic.player2Tiles);
  });

  socket.on('handleBoardClick', index => {
    gameLogic.handleBoardAction(socket.id, index);
    if (socket.id === gameLogic.player1ID){
      socket.emit('showPlayerBoardTiles', gameLogic.player1Tiles);
      // console.log('length of P1 tiles on last go: ', gameLogic.noTilesOnPlayer1BoardLastGo);
      // console.log('length of P1 tiles on current go: ', gameLogic.countNoActiveTilesOnBoard(gameLogic.player1Tiles));
      if (gameLogic.noTilesOnPlayer1BoardLastGo > gameLogic.countNoActiveTilesOnBoard(gameLogic.player1Tiles)){
        socket.emit('changeStatusOfTakeExtraTileButton', true);
        socket.emit('changeStatusOfEndPlayerTurnButton', false);
      } else {
        socket.emit('changeStatusOfTakeExtraTileButton', false);
        socket.emit('changeStatusOfEndPlayerTurnButton', true);
      };
    } else {
      socket.emit('showPlayerBoardTiles', gameLogic.player2Tiles);
      // console.log('length of P2 tiles on last go: ', gameLogic.noTilesOnPlayer2BoardLastGo);
      // console.log('length of P2 tiles on current go: ', gameLogic.countNoActiveTilesOnBoard(gameLogic.player2Tiles));
      if (gameLogic.noTilesOnPlayer2BoardLastGo > gameLogic.countNoActiveTilesOnBoard(gameLogic.player2Tiles)){
        socket.emit('changeStatusOfTakeExtraTileButton', true);
        socket.emit('changeStatusOfEndPlayerTurnButton', false);
      } else {
        socket.emit('changeStatusOfTakeExtraTileButton', false);
        socket.emit('changeStatusOfEndPlayerTurnButton', true);
      };
    };

  });

  socket.on('handleTableClick', index => {
    console.log(index);
    gameLogic.handleTableAction(socket.id, index);
    if (socket.id === gameLogic.player1ID){
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
      console.log('length of P1 tiles on last go: ', gameLogic.noTilesOnPlayer1BoardLastGo);
      console.log('length of P1 tiles on current go: ', gameLogic.countNoActiveTilesOnBoard(gameLogic.player1Tiles));
      // if (gameLogic.noTilesOnPlayer1BoardLastGo > gameLogic.countNoActiveTilesOnBoard(gameLogic.player1Tiles) && !gameLogic.selectedPlayer1Tile){
      //   socket.emit('changeStatusOfEndPlayerTurnButton', true);
      // } else {
      //   socket.emit('changeStatusOfEndPlayerTurnButton', false);
      // };
    } else {
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
      console.log('length of P2 tiles on last go: ', gameLogic.noTilesOnPlayer2BoardLastGo);
      console.log('length of P2 tiles on current go: ', gameLogic.countNoActiveTilesOnBoard(gameLogic.player2Tiles));
      // if (gameLogic.noTilesOnPlayer2BoardLastGo > gameLogic.countNoActiveTilesOnBoard(gameLogic.player2Tiles) && !gameLogic.selectedPlayer2Tile){
      //   socket.emit('changeStatusOfEndPlayerTurnButton', true);
      // } else {
      //   socket.emit('changeStatusOfEndPlayerTurnButton', false);
      // };
    };
  });

  socket.on('lookForAWinner', () => {
    gameLogic.checkForAWin(socket.id);
    if (gameLogic.winner) {
      io.sockets.emit('endGame');
    };
    if (gameLogic.winner === gameLogic.player1ID) {
      io.sockets.emit('changeBannerMessage', "It's all over... PLAYER 1 WINS!!!");
    } else if (gameLogic.winner === gameLogic.player2ID) {
      io.sockets.emit('changeBannerMessage', "It's all over... PLAYER 2 WINS!!!");
    }
  });

});




http.listen(3001, function () {
  console.log(`Chat app running on port ${this.address().port}`);
});
