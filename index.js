//Initialize the express 'app' object
let express = require("express");
let app = express();
app.use("/", express.static("public"));

//Initialize the actual HTTP server
let http = require("http");
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server listening at port: " + port);
});

//Initialize socket.io
let io = require("socket.io").listen(server);

//Listen for individual clients/users to connect
io.sockets.on("connection", function(socket) {
  console.log("We have a new client: " + socket.id);

  //Listen for a message named 'msg' from this client
  socket.on("msg", function(data) {
    //Data can be numbers, strings, objects
    console.log("Received a 'msg' event");
    console.log(data);

    //Send a response to all clients, including this one
    io.sockets.emit("msg", data);
  });

  //Event - Listen for the "spinData" msg
  socket.on("spinData", function(data) {
    // io.sockets.emit("spinData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("spinData", data);
  });

  //Event - Listen for the "cardData" msg
  socket.on("cardData", function(data) {
    // io.sockets.emit("cardData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("cardData", data);
  });

  //Event - Listen for the "redData" msg
  socket.on("redData", function(data) {
    // io.sockets.emit("redData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("redData", data);
  });

  //Event - Listen for the "blueData" msg
  socket.on("blueData", function(data) {
    // io.sockets.emit("blueData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("blueData", data);
  });

  //Event - Listen for the "greenData" msg
  socket.on("greenData", function(data) {
    // io.sockets.emit("greenData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("greenData", data);
  });

  //Event - Listen for the "yellowData" msg
  socket.on("yellowData", function(data) {
    // io.sockets.emit("yellowData", data);
    //Send the data to all other clients, not including this one
    socket.broadcast.emit("yellowData", data);
  });

  //Listen for this client to disconnect
  socket.on("disconnect", function() {
    console.log("A client has disconnected: " + socket.id);
  });
});
