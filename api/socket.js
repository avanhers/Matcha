let io = require("socket.io");

const users {
  user
}

const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;

  console.log(token);
  return next(new Error("Noting Defined"));
};

const socketConnection = (socket) => {
  socket.emit("message", { message: "Hey!" });
};

exports.startIo = function startIo(server) {
  io = io.listen(server);

  const test = io.of("/test");
  test.use(socketAuth);
  test.on("connection", socketConnection);

  return io;
};
