const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"],
  ["./images/PacMan3.png", "./images/PacMan4.png"],
];
var direction = 0;
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}
// Factory to make a PacMan
function makePac() {
  // returns an object with values scaled {x: 33, y: 21}
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById("game");
  let newimg = document.createElement("img");
  newimg.style.position = "absolute";
  newimg.src = "./images/PacMan1.png";
  newimg.width = 100;
  newimg.style.left = position.x + "px";
  newimg.style.top = position.y + 50 + "px";
  game.appendChild(newimg);
  return {
    position,
    velocity,
    newimg,
  };
}

function update() {
  //loop over pacmen array and move each one and move image in DOM
  console.log(pacMen);
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  if (
    item.position.x + item.velocity.x + item.newimg.width >
    window.innerWidth
  ) {
    item.velocity.x = -item.velocity.x;
    item.newimg.src = "./images/PacMan3.png";
  } else if (item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
    item.newimg.src = "./images/PacMan1.png";
  }

  if (
    item.position.y + item.velocity.y + item.newimg.height >
      window.innerHeight ||
    item.position.y + item.velocity.y < 50
  ) {
    item.velocity.y = -item.velocity.y;
  }
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

if (typeof module !== "undefined") {
  module.exports = { checkCollisions, update, pacMen };
}
