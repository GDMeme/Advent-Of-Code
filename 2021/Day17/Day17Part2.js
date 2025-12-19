const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

arr = syncReadFile('./input.txt');

let [minX, combination, maxY] = arr[0].split('..');

minX = parseInt(minX.split('=')[1]);
let [maxX, minY] = combination.split(',');
maxX = parseInt(maxX);
minY = parseInt(minY.split('=')[1]);
maxY = parseInt(maxY);

const highestInitialYVelocity = -minY - 1;

const lowestInitialXVelocity = 14; // hardcoded by looking at input (solved quadratic)

let counter = 0;

for (let i = minY; i <= highestInitialYVelocity; i++) { // i is initial y velocity
  for (let j = lowestInitialXVelocity; j <= maxX; j++) { // j is initial x velocity
    let currentX = 0;
    let currentY = 0;
    let yVelocity = i;
    let xVelocity = j;
    while (true) {
      if (currentY < minY) {
        break;
      }
      if (currentX > maxX) {
        break;
      }
      currentX += xVelocity;
      currentY += yVelocity;
      if (xVelocity > 0) {
        xVelocity--;
      }
      yVelocity--;
      if (checkTargetArea(currentX, currentY)) {
        counter++;
        break;
      }
    }
  }
}

console.log(counter);

function checkTargetArea (x, y) {
  if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    } else {
      return false;
    }
}