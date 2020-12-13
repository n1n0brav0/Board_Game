//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on("connect", function() {
  console.log("Connected");
});

window.addEventListener("load", function() {
  //Open and connect socket
  let socket = io();
  //Listen for confirmation of connection
  socket.on("connect", function() {
    console.log("Connected");
  });

  /* --- Code to RECEIVE a socket message from the server --- */
  let chatBox = document.getElementById("chat-box-msgs");

  //Listen for messages named 'msg' from the server
  socket.on("msg", function(data) {
    console.log("Message arrived!");
    console.log(data);

    //Create a message string and page element
    let receivedMsg = data.name + ": " + data.msg;
    let msgEl = document.createElement("p");
    msgEl.innerHTML = receivedMsg;

    //Add the element with the message to the page
    chatBox.appendChild(msgEl);
    //Add a bit of auto scroll for the chat box
    chatBox.scrollTop = chatBox.scrollHeight;
  });

  /* --- Code to SEND a socket message to the Server --- */
  let nameInput = document.getElementById("name-input");
  let msgInput = document.getElementById("msg-input");
  let sendButton = document.getElementById("send-button");

  sendButton.addEventListener("click", function() {
    let curName = nameInput.value;
    let curMsg = msgInput.value;
    let msgObj = { name: curName, msg: curMsg };

    //Send the message object to the server
    socket.emit("msg", msgObj);
  });
});

//Listen for messages named 'data' from the server
socket.on("spinData", function(obj) {
  console.log(obj);
  let spinData = document.getElementById("spinData");
  spinData.innerHTML = obj;
});

socket.on("cardData", function(obj) {
  console.log(obj);
  let cardData = document.getElementById("cardData");
  cardData.innerHTML = obj;
});

socket.on("redData", function(obj) {
  red.x = obj.curX;
  red.y = obj.curY;
});
socket.on("blueData", function(obj) {
  blue.x = obj.curX;
  blue.y = obj.curY;
});
socket.on("greenData", function(obj) {
  green.x = obj.curX;
  green.y = obj.curY;
});
socket.on("yellowData", function(obj) {
  yellow.x = obj.curX;
  yellow.y = obj.curY;
});

//loads JSON data from cards list
window.addEventListener("load", function() {
  fetch("chancecards.json")
    .then(response => response.json())
    .then(data => {});

  //"Spinner" button - Random number from 1-6
  let spinnerButton = document.getElementById("spinnerButton");
  spinnerButton.addEventListener("click", function() {
    // console.log("spinnerButton was clicked");
    let spinNumber = (document.getElementById(
      "spinNumber"
    ).innerHTML = Math.floor(Math.random() * 6 + 1));
    socket.emit("spinData", spinNumber);
  });

  //"Chance Card" button - returns random result from chancecards.json
  let chanceButton = document.getElementById("chanceButton");
  chanceButton.addEventListener("click", function() {
    fetch("chancecards.json")
      .then(response => response.json())
      .then(data => {
        let chanceArray = data.cards;
        let randomNumber = Math.floor(Math.random() * chanceArray.length);
        let nameElement = document.getElementById("currentCard");
        nameElement.innerHTML = chanceArray[randomNumber];
        let currentCard = chanceArray[randomNumber];
        socket.emit("cardData", currentCard);
      });
  });
});

function preload() {
  img = loadImage("assets/board2.jpg");
}

let img;
let red;
let blue;
let green;
let yellow;
let purple;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  image(img, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  red = new Draggable(50, 50, 25, 25);
  blue = new Draggable(50, 110, 25, 25);
  green = new Draggable(50, 170, 25, 25);
  yellow = new Draggable(50, 230, 25, 25);
  // purple = new Draggable(50, 230, 25, 25);
}

function draw() {
  background(255);
  image(img, 150, 0);

  red.over();
  red.update();
  fill(255, 0, 0);
  red.show();

  blue.over();
  blue.update();
  fill(0, 0, 255);
  blue.show();

  green.over();
  green.update();
  fill(0, 255, 0);
  green.show();

  yellow.over();
  yellow.update();
  fill(255, 255, 0);
  yellow.show();
  
  // purple.over();
  // purple.update();
  // fill(purple);
  // purple.show();
}

function mousePressed() {
  red.pressed();
  blue.pressed();
  green.pressed();
  yellow.pressed();
}

function mouseReleased() {
  red.released();
  {
    let redPos = {
      curColor: "red",
      curX: red.x,
      curY: red.y
    };
    socket.emit("redData", redPos);
  }
  blue.released();
  {
    let bluePos = {
      curColor: "blue",
      curX: blue.x,
      curY: blue.y
    };
    socket.emit("blueData", bluePos);
  }
  green.released();
  {
    let greenPos = {
      curColor: "green",
      curX: green.x,
      curY: green.y
    };
    socket.emit("greenData", greenPos);
  }
  yellow.released();
  {
    let yellowPos = {
      curColor: "yellow",
      curX: yellow.x,
      curY: yellow.y
    };
    socket.emit("yellowData", yellowPos);
  }
}

