// Board
let blockSize = 25;
let rows = 30;
let cols = 30;
let board;
let context;
const playAgain = document.querySelector(".btn");
// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let velX = 0;
let velY = 0;

let snakeBody = [];
// food
let foodX;
let foodY;

let gameOver = false;

// Prevent page from scrolling with arrow keys

window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); // Used for drawing on board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); // 100 miliseconds;
};
function update() {
  if (gameOver) {
    context.fillStyle = "#332F49";
    context.fillRect(0, 0, board.width, board.height);

    // Note: This is ridiculous and I did it for fun, a much more elegant solution would be simply overlaying text ontop of the canvas to spell "GAME" instead of manually hand drawing it. Even using arrays to store X and Y coordinates then using loops to draw would have been better than this.

    context.fillStyle = "#ee6c4d";
    // G
    context.fillRect(5 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(4 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(3 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(2 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(0 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(0 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(0 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(0 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(1 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(2 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(2 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(3 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(4 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(5 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(4 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(5 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(4 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(5 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(4 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(5 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(3 * blockSize, 19 * blockSize, blockSize, blockSize);
    // A
    context.fillRect(10 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(11 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(9 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(8 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(7 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(12 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(14 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(13 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(9 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(10 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(11 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(12 * blockSize, 20 * blockSize, blockSize, blockSize);
    // M
    context.fillRect(16 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(16 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(17 * blockSize, 15 * blockSize, blockSize, blockSize);
    //
    context.fillRect(18 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(18 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(19 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(19 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(19 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(20 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(20 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 16 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 15 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 17 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 18 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 19 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 20 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 21 * blockSize, blockSize, blockSize);
    context.fillRect(22 * blockSize, 22 * blockSize, blockSize, blockSize);
    context.fillRect(21 * blockSize, 22 * blockSize, blockSize, blockSize);
    // E
    for (i = 0; i < 5; i++) {
      context.fillRect(
        (24 + i) * blockSize,
        15 * blockSize,
        blockSize,
        blockSize
      );

      context.fillRect(
        (24 + i) * blockSize,
        18 * blockSize,
        blockSize,
        blockSize
      );

      context.fillRect(
        (24 + i) * blockSize,
        19 * blockSize,
        blockSize,
        blockSize
      );

      context.fillRect(
        (24 + i) * blockSize,
        22 * blockSize,
        blockSize,
        blockSize
      );

      context.fillRect(
        24 * blockSize,
        (17 + i) * blockSize,
        blockSize,
        blockSize
      );
    }
    context.fillRect(24 * blockSize, 16 * blockSize, blockSize, blockSize);
    return;
  }

  context.fillStyle = "#332F49";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "#D81E1E";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "#2D912A";
  snakeX += velX * blockSize;
  snakeY += velY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);

  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  // Game over
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    playAgain.classList.remove("hidden");
    context.fillStyle = "#332F49";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
  }

  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      playAgain.classList.remove("hidden");
      context.fillStyle = "#332F49";
      context.fillRect(foodX, foodY, blockSize, blockSize);
      for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(
          snakeBody[i][0],
          snakeBody[i][1],
          blockSize,
          blockSize
        );
      }
    }
  }
}

function changeDirection(e) {
  if (e.key === "ArrowUp" && velY !== 1) {
    velX = 0;
    velY = -1;
  } else if (e.key === "ArrowDown" && velY !== -1) {
    velX = 0;
    velY = 1;
  } else if (e.key === "ArrowLeft" && velX !== 1) {
    velX = -1;
    velY = 0;
  } else if (e.key === "ArrowRight" && velX !== -1) {
    velX = 1;
    velY = 0;
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * cols) * blockSize;
}

function init() {
  snakeX = blockSize * 5;
  snakeY = blockSize * 5;
  velX = 0;
  velY = 0;
  snakeBody = [];
  gameOver = false;
  playAgain.classList.add("hidden");
  placeFood();
}

playAgain.addEventListener("click", init);
