const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("hey people");
});

const PORT = process.env.PORT || 3000;
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("truck", (receivedLocation) => {
    console.log(receivedLocation);
    io.emit("user", receivedLocation);
  });
});
server.listen(PORT, "0.0.0.0", () => console.log("app started"));
