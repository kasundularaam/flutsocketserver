const express = require("express");
const app = express();
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.get("/", (req, res) => {
  res.send("hey people");
});

app.get("/login/:email/:password", (req, res) => {
  var email = req.params.email;
  var password = req.params.password;
  const driverMail = "berry";
  console.log(email + " " + password);
  console.log(email.valueOf() == driverMail.valueOf());
  if (email.valueOf() == driverMail.valueOf()) {
    res.send(JSON.stringify({ email: email, isDriver: true }));
  } else {
    res.send(JSON.stringify({ email: email, isDriver: false }));
  }

  // res.writeHead(200, { "Content-Type": "application/json" });
});

const PORT = process.env.PORT || 3000;
io.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("driver", (receivedLocation) => {
    console.log(receivedLocation);
    io.emit("user", receivedLocation);
  });
});
server.listen(PORT, "0.0.0.0", () => console.log("app started"));
