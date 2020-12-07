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

  //Event - Listen for the "data" msg
  socket.on("data", function(data) {
    // io.sockets.emit("data", data);
    console.log("Received: 'data' " + data);

    //Send the data to all other clients, not including this one
    socket.broadcast.emit("data", data);
  });

  // //Listen for a message named 'data' from this client
  // socket.on('data', function (data) {
  // });

  // //Event - Listen for the "redPosition" msg
  // socket.on('position', function (data) {
  //     io.sockets.emit('redPos', data);
  // });

  //Listen for this client to disconnect
  socket.on("disconnect", function() {
    console.log("A client has disconnected: " + socket.id);
  });
});

// // JOINING MESSAGE DATA
// let messageData = {
//     "messages": messages[levelData],
//     "score1": "Great, together you have cleared",
//     "score2": scores,
//     "score3": "balls, you are getting closer to the deep!",
// };
// socket.emit('levelMsg', messageData); // send the data only to this client
