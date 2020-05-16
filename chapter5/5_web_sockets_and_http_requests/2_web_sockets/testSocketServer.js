const server = require("http").createServer();
const io = require("socket.io")(server);

const sendMsg = (msgType, content) => {
  io.sockets.emit(msgType, content);
};

const start = () =>
  new Promise(resolve => {
    server.listen(3000, resolve);
  });

const stop = () =>
  new Promise(resolve => {
    server.close(resolve);
  });

module.exports = { start, stop, sendMsg };
