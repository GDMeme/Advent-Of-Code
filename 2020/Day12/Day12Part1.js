const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// ['E', 'S', 'W', 'N'];
let currentDirectionIndex = 0;

let currentX = 0;
let currentY = 0;

for (let i = 0; i < arr.length; i++) {
    const instruction = arr[i][0];
    const value = parseInt(arr[i].slice(1));
    switch (instruction) {
        case 'N':
            currentY += value;
            break;
        case 'S':
            currentY -= value;
            break;
        case 'E':
            currentX += value;
            break;
        case 'W':
            currentX -= value;
            break;
        case 'L':
            currentDirectionIndex -= value / 90;
            if (currentDirectionIndex < 0) {
                currentDirectionIndex += 4;
            }
            break;
        case 'R':
            currentDirectionIndex += value / 90;
            currentDirectionIndex %= 4;
            break;
        case 'F':
            if (currentDirectionIndex === 0) {
                currentX += value;
            } else if (currentDirectionIndex === 1) {
                currentY -= value;
            } else if (currentDirectionIndex === 2) {
                currentX -= value;
            } else {
                currentY += value;
            }
            break;
    }
}

console.log(Math.abs(currentX) + Math.abs(currentY));