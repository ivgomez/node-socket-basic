const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const path = require("path");
const app = express();

const server = http.createServer(app);
const publicPath = path.resolve(__dirname, "../public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// io = comunication with the BE
const io = socketIO(server);

io.on("connection", (client) => {
  //console.log("user connected");

  // SEND INFO TO THE CLIENT
  client.emit("sendMessage", {
    user: "Admin",
    message: "Welcome to the socket app",
  });

  client.on("disconnect", () => {
    //console.log("user disconnected");
  });

  // LISTEN FROM CLIENT
  client.on("sendMessage", (message) => {
    console.log("message:", message);
  });
});

server.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`server running on ${port}`);
});
