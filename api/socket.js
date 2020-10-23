let io = require("socket.io");
const tokenManager = require("./src/lib/jwt");
const notificationManager = require("./src/manager/NotificationManager");
const UserManager = require("./src/manager/UserManager");
const manager = new UserManager();

const users = {};

function socketEmitTo(sender, username, type, data) {
  const sockets = users[username];

  if (sockets) {
    sockets.forEach((socketId) => {
      sender.to(socketId).emit(type, data);
    });
  }
}

const socketAuth = async (socket, next) => {
  const token = socket.handshake.query.token;
  const username = await tokenManager.getUser(token);

  if (username) {
    if (!users[username]) {
      users[username] = [];
    }
    users[username].push(socket.id);
    console.log(
      `SOCKETIO_AUTH: ${username} connected\nNumber of connetions: ${users[username].length}`
    );
    socket.username = username;
    return next();
  }
  return next(new Error("Noting Defined"));
};

const socketConnection = (socket) => {
  console.log(`SOCKETIO_CON: ${socket.username} connected\n`);

  socket.on("disconnect", () => {
    const sockets = users[socket.username];

    console.log(
      `SOCKETIO: ${socket.username} disconnected on socket ${
        socket.id
      }, socket opened ${users[socket.username]}`
    );
  });

  socket.on("notification", async (data) => {
    const { target: username, type } = data;
    const msg = {
      type: type,
      from: username,
    };

    socketEmitTo(socket, username, "notification", msg);
    await notificationManager.addNotification(socket.username, type, username);
  });

  socket.on("message", async (data) => {
    const { username, msg } = data;
    const from = await manager.findUserByUsername(socket.username);
    const to = await manager.findUserByUsername(username);
    const pckt = {
      from: socket.username,
      msg: msg,
    };
    console.log(pckt.msg);
    socketEmitTo(socket, username, "message", pckt);
    await notificationManager.addMessage(from.getId(), to.getId(), msg);
  });
};

exports.startIo = function startIo(server) {
  io = io.listen(server);

  io.on("connection", (socket) => {
    console.log("socket connected: ", socket.id);
  });
  const test = io.of("/test");
  test.use(socketAuth);
  test.on("connection", socketConnection);

  return io;
};
