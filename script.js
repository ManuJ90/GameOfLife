const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const size = 1000;
const scale = 4;
const resolution = size / scale;
const invert = 5000
let intervalTime = invert / 150;

let cells;

setup();
randomCell();
drawCells();

var interval = setInterval(step, intervalTime);

const stopButton = document.querySelector(".stop");

stopButton.onclick = function () {
  clearInterval(interval);
};

const playButton = document.querySelector(".play");

playButton.onclick = function () {
  clearInterval(interval);
  interval = setInterval(step, intervalTime);
};

const clearButton = document.querySelector(".clear");

clearButton.onclick = function () {
  clearInterval(interval);
  clear();
};

const randomButton = document.querySelector(".random");

randomButton.onclick = function () {
  clearInterval(interval);
  setup();
  randomCell();
  drawCells();
  interval = setInterval(step, intervalTime);
};

const nextButton = document.querySelector(".next");

nextButton.onclick = function () {
  step();
};

const intervalSlider = document.querySelector('input[type="range"]');

intervalSlider.onclick = function () {
  clearInterval(interval);
  intervalTime = invert / intervalSlider.value ;
  interval = setInterval(step, intervalTime);
};

function clear() {
  canvas.width = size;
  canvas.height = size;
  context.scale(scale, scale);
  context.fillStyle = "#922020";
}

function setup() {
  clear();
  cells = createCells();
}

function createCells() {
  let arr = new Array(resolution);
  for (let x = 0; x < resolution; x++) {
    let cols = new Array(resolution);
    for (let y = 0; y < resolution; y++) {
      cols[y] = false;
    }
    arr[x] = cols;
  }
  return arr;
}

function randomCell() {
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      if (Math.random() < 0.5) cells[x][y] = true;
    }
  }
}

function drawCells() {
  console.log("drawCells");
  context.fillStyle = "#922020";
  context.fillRect(0, 0, resolution, resolution);
  context.fillStyle = "#ff0000";
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      if (cells[x][y]) context.fillRect(x, y, 1, 1);
    }
  }
}

function step() {
  let newCells = createCells();
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const neighbours = getNeighCount(x, y);
      if (cells[x][y] && neighbours >= 2 && neighbours <= 3)
        newCells[x][y] = true;
      else if (!cells[x][y] && neighbours === 3) newCells[x][y] = true;
    }
  }
  cells = newCells;
  drawCells();
}

function getNeighCount(x, y) {
  let count = 0;
  for (let yy = -1; yy < 2; yy++) {
    for (let xx = -1; xx < 2; xx++) {
      if (xx === 0 && yy === 0) continue;
      if (x + xx < 0 || x + xx > resolution - 1) continue;
      if (y + yy < 0 || y + yy > resolution - 1) continue;
      if (cells[x + xx][y + yy]) count++;
    }
  }
  return count;
}