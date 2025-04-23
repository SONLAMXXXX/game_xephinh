const cols = 10;
const rows = 20;
const block_size = 30;
const color_mapping = [
  "red",
  "orange",
  "green",
  "purple",
  "blue",
  "cyan",
  "yellow",
  "white",
  "white",
]; // mau sac cac khoi hinh
const BRICK_LAYOUT = [
  [
    [
      [1, 7, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 1],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 1, 7],
      [7, 1, 7],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [7, 1, 7],
      [7, 1, 1],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 7, 1],
      [1, 1, 1],
      [7, 7, 7],
    ],
  ],
  [
    [
      [1, 7, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
    [
      [7, 1, 1],
      [1, 1, 7],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 7, 1],
    ],
    [
      [7, 7, 7],
      [7, 1, 1],
      [1, 1, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 7],
      [1, 7, 7],
    ],
    [
      [1, 1, 7],
      [7, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 7, 1],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 7],
      [7, 1, 1],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
      [7, 7, 1, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 7, 7, 7],
      [1, 1, 1, 1],
      [7, 7, 7, 7],
    ],
    [
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
      [7, 1, 7, 7],
    ],
  ],
  [
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
    [
      [7, 7, 7, 7],
      [7, 1, 1, 7],
      [7, 1, 1, 7],
      [7, 7, 7, 7],
    ],
  ],
  [
    [
      [7, 1, 7],
      [1, 1, 1],
      [7, 7, 7],
    ],
    [
      [7, 1, 7],
      [7, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 7, 7],
      [1, 1, 1],
      [7, 1, 7],
    ],
    [
      [7, 1, 7],
      [1, 1, 7],
      [7, 1, 7],
    ],
  ],
];

const keyCode = {
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
};

const white_color_id = 7;

const canvas = document.getElementById("board");

const ctx = canvas.getContext("2d");

ctx.canvas.width = cols * block_size;
ctx.canvas.height = rows * block_size;

class Board {
  constructor(ctx) {
    this.ctx = ctx;
    this.grid = this.generateWhiteBoard();
    this.score = 0;
    this.gameOver = false;
    this.isPlaying = false;
  }
  reset() {
    this.score = 0;
    this.grid = this.generateWhiteBoard();
    this.gameOver = false;
    this.drawBoard();
  }

  // tao mang 2 chieu co 20 hang va 10 cot
  generateWhiteBoard() {
    return Array.from({ length: rows }, () => Array(cols).fill(white_color_id));
  }
  // tao ham ve 1  o
  drawCell(x, y, colorId) {
    this.ctx.fillStyle =
      color_mapping[colorId] || color_mapping[white_color_id]; // ve mau sac

    this.ctx.fillRect(x * block_size, y * block_size, block_size, block_size); // ve o vuong

    this.ctx.fillStyle = "black"; // ve mau duong vien

    this.ctx.strokeRect(x * block_size, y * block_size, block_size, block_size); // ve vien
  }

  //   tao ham ve toan bo   o
  drawBoard() {
    for (let hang = 0; hang < this.grid.length; hang++) {
      for (let cot = 0; cot < this.grid[0].length; cot++) {
        this.drawCell(cot, hang, this.grid[hang][cot]); // ve toan bo mang
      }
    }
  }

  //cap nhat hang khi da hoan thanh
  handleCompeleteRow() {
    const lateGrid = board.grid.filter((row) => {
      return row.some((col) => col == white_color_id);
    });
    const newScore = rows - lateGrid.length; // newScore  = tong hang da hoan thanh
    const newRow = Array.from({ length: newScore }, () =>
      Array(cols).fill(white_color_id)
    );
    if (newScore) {
      board.grid = [...newRow, ...lateGrid]; // cap nhat mang
      this.handleScore(newScore * 10);
    }
  }

  //   tinh diem

  handleScore(newScore) {
    this.score += newScore; // cap nhat diem
    document.getElementById("score").innerHTML = this.score; // cap nhat diem len man hinh
  }

  //   gameOver
  handleGmaeOver() {
    alert("Game Over");
    this.gameOver = true;
  }
}

//    tao class vien gach
class Brick {
  constructor(id) {
    this.id = id;
    this.layout = BRICK_LAYOUT[id]; // lay layout tuong ung
    this.activeIndex = 0; // huong hien tai
    this.colPos = 3; // vi tri cot
    this.rowPos = -2; // vi tri hang
    this.gameOver = false;
  }

  //     viet 1 method in ra 1 vien gach
  draw() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== white_color_id) {
          board.drawCell(col + this.colPos, row + this.rowPos, this.id); // ve vien gach
        }
      }
    }
  }

  //   xoa vien gach cu
  clear() {
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== white_color_id) {
          board.drawCell(col + this.colPos, row + this.rowPos, white_color_id); // xoa vien gach
        }
      }
    }
  }

  //di chuyen, xoay vien gach
  moveLeft() {
    if (
      !this.checkCollission(
        this.rowPos,
        this.colPos - 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear(); // xoa vien gach cu
      this.colPos--;
      this.draw();
    }
  }
  moveRight() {
    if (
      !this.checkCollission(
        this.rowPos,
        this.colPos + 1,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear(); // xoa vien gach cu
      this.colPos++;
      this.draw();
    }
  }
  moveDown() {
    if (
      !this.checkCollission(
        this.rowPos + 1,
        this.colPos,
        this.layout[this.activeIndex]
      )
    ) {
      this.clear(); // xoa vien gach cu
      this.rowPos++;
      this.draw();
      return;
    }
    this.handleLanded(); // xu ly khi vien gach ha xuong
    // if (board.gameOver) {
    // }
    generateNewBrick(); // tao ra vien gach moi}
  }
  rotate() {
    if (
      !this.checkCollission(
        this.rowPos,
        this.colPos,
        this.layout[(this.activeIndex + 1) % 4]
      )
    ) {
      this.clear(); // xoa vien gach cu
      this.activeIndex = (this.activeIndex + 1) % 4; // xoay vien gach
      this.draw();
    }
  }

  //   check va cham
  checkCollission(nextRow, nextCol, nexLayout) {
    for (let row = 0; row < nexLayout.length; row++) {
      for (let col = 0; col < nexLayout[0].length; col++) {
        if (nexLayout[row][col] !== white_color_id && nextRow >= 0) {
          if (
            col + nextCol < 0 ||
            col + nextCol >= cols ||
            row + nextRow >= rows ||
            board.grid[row + nextRow][col + nextCol] !== white_color_id
          ) {
            return true;
          }
        }
      }
    }
  }

  //    xly khi ha xuong
  handleLanded() {
    if (this.rowPos <= 0) {
      board.handleGmaeOver();
      return;
    }
    for (let row = 0; row < this.layout[this.activeIndex].length; row++) {
      for (let col = 0; col < this.layout[this.activeIndex][0].length; col++) {
        if (this.layout[this.activeIndex][row][col] !== white_color_id) {
          board.grid[row + this.rowPos][col + this.colPos] = this.id;
        }
      }
    }

    board.handleCompeleteRow(); // xu ly khi vien gach ha xuong
    board.drawBoard(); // ve lai toan bo mang
  }
}

//    viet ham tao ra 1 vien gach ngau nhien
function generateNewBrick() {
  brick = new Brick(Math.floor(Math.random() * 10) % BRICK_LAYOUT.length); //tao ra 1 id bat ki nam tu 0 den 6
}

//  goi ham
board = new Board(ctx);
board.drawBoard();

document.getElementById("play").addEventListener("click", () => {
  board.reset(); // reset lai mang
  board.isPlaying = true; // bat dau choi
  generateNewBrick();

  // callback sau 1s
  const refesh = setInterval(() => {
    if (!board.gameOver) {
      brick.moveDown();
    } else {
      clearInterval(refesh);
    }
  }, 1000);
});

// lang nghe su kien
document.addEventListener("keydown", (e) => {
  if (!board.gameOver) {
    console.log({ e });
    switch (e.code) {
      case keyCode.LEFT:
        brick.moveLeft();
        break;
      case keyCode.RIGHT:
        brick.moveRight();
        break;
      case keyCode.UP:
        brick.rotate();
        break;
      case keyCode.DOWN:
        brick.moveDown();
        break;
      default:
        break;
    }
  }
});
