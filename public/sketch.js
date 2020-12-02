//Open and connect socket
let socket = io();

//Listen for confirmation of connection
socket.on('connect', function () {
  console.log("Connected");
});

//Listen for messages named 'data' from the server
socket.on('data', function (obj) {
  console.log(obj);
  redPos(obj);
  bluePos(obj);
  greenPos(obj);
  yellowPos(obj);
});

//loads JSON data from genre list
window.addEventListener('load', function () {
  fetch('chancecards.json')
      .then(response => response.json())
      .then(data => {
          console.log(data);
          let chanceArray = data.chancecards;
          let randomNumber = Math.floor(Math.random() * chanceArray.length)
          let nameElement = document.getElementById('chancecard');
          nameElement.innerHTML = chanceArray[randomNumber];
          currentCard = chanceArray[randomNumber]
      })
      .catch(error => {
          console.log(error)
      })
  //"Spinner" button - Random number from 1-6    
  let spinnerbutton = document.getElementById('spinnerbutton');
  spinnerbutton.addEventListener('click', function () {
      console.log("spinnerbutton was clicked");
      function randomNumber(min, max) {
        return Math.floor(Math.random() * 6) + 1;
      }
   
      
  })
  //"Chance Card" button - returns random result from chancecards.json
  let chancebutton = document.getElementById('chancebutton');
  chancebutton.addEventListener('click', function () {
      console.log(currentCard);
 
  })
})
function preload() {
  img = loadImage('assets/board1.jpg');
}

let img;
let red;
let blue;
let green;
let yellow;

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CORNER);
  image(img, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
  red = new Draggable(50, 50, 25, 25,);
  blue = new Draggable(50, 110, 25, 25);
  green = new Draggable(50, 170, 25, 25);
  yellow = new Draggable(50, 230, 25, 25);
  
  //Listen for "positionUpdate" msg from the server
  socket.on('positionUpdate', function (data) {
    console.log(data);
    // redPos(data);
    // bluePos(data);
    // greenPos(data);
    // yellowPos(data);
  });
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
}

function mousePressed() {
  red.pressed();
  blue.pressed();
  green.pressed();
  yellow.pressed();
}

function mouseReleased() {
  red.released();
  blue.released();
  green.released();
  yellow.released();

  // socket.emit('position', positionUpdate);
}
let positionUpdate = {
  curColor: "red",
  curX: red.x,
  curY: red.y
}
// let blockUpdate = {
//   curColor: "blue",
//   curX: blue.x,
//   curY: blue.y
// }
// let blockUpdate = {
//   curColor: "green",
//   curX: green.x,
//   curY: green.y
// }
// let blockUpdate = {
//   curColor: "yellow",
//   curX: yellow.x,
//   curY: yellow.y
// }


  // let redPos = (red.x, red.y);
  // socket.emit('position', redPos);
  // let bluePos = (blue.x, blue.y);
  // socket.emit('position', bluePos);
  // let greenPos = (green.x, green.y);
  // socket.emit('position', greenPos);
  // let yellowPos = (yellow.x, yellow.y);
  // socket.emit('position', yellowPos);