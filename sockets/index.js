const io = require('socket.io')();

io.on('connection', (client) => {
  io.emit('welcome');

  client.on("test", () => {
    console.log("received test"); // not displayed
    io.emit("ok");
  })
});

io.listen(18092);
