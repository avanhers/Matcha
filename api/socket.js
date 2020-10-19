let io = require("socket.io");

const socketConnection = (socket) => {
  socket.emit("message", { message: "Hey!" });
};

exports.startIo = function startIo(server) {
  io = io.listen(server);

  const test = io.of("/test");
  test.on("connection", socketConnection);

  return io;
};
