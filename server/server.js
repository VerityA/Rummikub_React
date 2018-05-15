const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const GameLogic = require('./models/GameLogic.js');

const gameLogic = new GameLogic();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', socket => {
  gameLogic.addNewPlayer(socket.id)
  console.log('player1 ID: ', gameLogic.player1ID);
  console.log('player2 ID: ', gameLogic.player2ID);
  console.log('player 1 tiles: ', gameLogic.player1Tiles);
  console.log('player 2 tiles: ', gameLogic.player2Tiles);
  console.log('a user connected');
  console.log(socket.id);

  socket.on('playerID', message => {
    console.log('player who clicked button: ', socket.id);
  });

  socket.on('getPlayersStartingTiles', () => {
    gameLogic.getStartingTiles(socket.id);
    if (socket.id === gameLogic.player1ID){
      socket.emit('takeStartingTiles', gameLogic.player1Tiles)
    } else {
      socket.emit('takeStartingTiles', gameLogic.player2Tiles)
    }

    console.log('player 1 tiles: ', gameLogic.player1Tiles);
    console.log('player 2 tiles: ', gameLogic.player2Tiles);
  });

  socket.on('getExtraTileFromBox', () => {
    gameLogic.getExtraTileFromBox(socket.id);
    if (socket.id === gameLogic.player1ID){
      socket.emit('takeExtraTile', gameLogic.player1Tiles)
    } else {
      socket.emit('takeExtraTile', gameLogic.player2Tiles)
    }

    console.log('player 1 tiles: ', gameLogic.player1Tiles);
    console.log('player 2 tiles: ', gameLogic.player2Tiles);
  });

  socket.on('handleBoardClick', index => {
    console.log(index);
    gameLogic.handleBoardAction(socket.id, index);
    if (socket.id === gameLogic.player1ID){
      socket.emit('showPlayerBoardTiles', gameLogic.player1Tiles);
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
    } else {
      socket.emit('showPlayerBoardTiles', gameLogic.player2Tiles)
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
    }

    console.log('player 1 tiles: ', gameLogic.player1Tiles);
    console.log('player 2 tiles: ', gameLogic.player2Tiles);
    console.log('table tiles: ', gameLogic.tableTiles);
  });

  socket.on('handleTableClick', index => {
    console.log(index);
    gameLogic.handleTableAction(socket.id, index);
    if (socket.id === gameLogic.player1ID){
      socket.emit('showPlayerBoardTiles', gameLogic.player1Tiles);
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
      console.log('player 1 tiles: ', gameLogic.player1Tiles);
    } else {
      socket.emit('showPlayerBoardTiles', gameLogic.player2Tiles)
      io.sockets.emit('showTableTiles', gameLogic.tableTiles);
      console.log('player 2 tiles: ', gameLogic.player2Tiles);
    }



    console.log('table tiles: ', gameLogic.tableTiles);
  });
});


http.listen(3001, function () {
  console.log(`Chat app running on port ${this.address().port}`);
});
