let io = require("socket.io");
const tokenManager = require("./src/lib/jwt");

const sockets = {};

const socketAuth = (socket, next) => {
  const token = socket.handshake.query.token;
  const username = tokenManager.getUser(token);

  if (username) {
    sockets[username] = socket.id;
    console.log(`SOCKETIO: ${username} connected`);
    return next();
  }
  return next(new Error("Noting Defined"));
};

const socketConnection = (socket) => {
  const username = Object.keys(sockets).find(
    (key) => sockets[key] === socket.id
  );
  socket.emit("message", { message: "Hey!" });

  socket.on("disconnect", () => {
    console.log(`SOCKETIO: ${username} disconnected`);
    //delete socket
  });

  socket.on("notification", (data) => {
    const { target, type } = data;
    const socket_target = sockets[target];

    if (socket_target) {
      console.log(`${target} joinable at ${socket_target}`);
      if (type === "like") {
        io.to(socket_target).emit("notification", {
          type: "like",
          from: username,
        });
      }
    }
    //ecriture en bdd
  });
};

exports.startIo = function startIo(server) {
  io = io.listen(server);

  const test = io.of("/test");
  test.use(socketAuth);
  test.on("connection", socketConnection);

  return io;
};
