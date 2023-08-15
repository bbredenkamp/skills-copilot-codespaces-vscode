// Create web server using express framework listening on port 3000

const server = app.listen(3000, () => {
    console.log('listening on port 3000');
  });
  
  // Create socket.io server
  const io = socket(server);
  
  // Create a new game
  const game = new Game();
  
  // Create an object to store all connected sockets
  const connectedSockets = {};
  
  // Listen for new socket connections
  io.on('connection', (socket) => {
    // Add new socket to list of connected sockets
    connectedSockets[socket.id] = socket;
  
    // Listen for new player joining
    socket.on('join', (data) => {
      // Add new player to game
      game.addPlayer(socket.id, data.username);
  
      // Send updated game state to all connected sockets
      io.sockets.emit('update', game.getGameState());
    });
  
    // Listen for player movement
    socket.on('move', (data) => {
      // Update player position
      game.movePlayer(socket.id, data.x, data.y);
  
      // Send updated game state to all connected sockets
      io.sockets.emit('update', game.getGameState());
    });
  
    // Listen for player disconnection
    socket.on('disconnect', () => {
      // Remove player from game
      game.removePlayer(socket.id);
  
      // Remove socket from list of connected sockets
      delete connectedSockets[socket.id];
  
      // Send updated game state to all connected sockets
      io.sockets.emit('update', game.getGameState());
    });
  });

  
