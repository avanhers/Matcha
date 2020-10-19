let io = require("socket.io");

exports.startIo = function startIo(server) {
  io = io.listen(server);
};
