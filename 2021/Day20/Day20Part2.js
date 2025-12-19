const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let lightPixels = new Set();

for (let i = 2; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '#') {
            lightPixels.add([j, i].join());
        }
    }
}

let minX = 0;
let maxX = arr[0].length - 1;

let minY = 2;
let maxY = arr.length - 1;

const rounds = 50;

const directionArray = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

const newLightPixels = new Set();

for (let i = 0; i < rounds; i++) {
    for (let j = minX - 1; j <= maxX + 1; j++) { // down and right is increasing
        for (let k = minY - 1; k <= maxY + 1; k++) {
            let currentBinaryNumber = '';
            for (const direction of directionArray) {
                const [directionX, directionY] = direction;
                const newX = j + directionX;
                const newY = k + directionY;
                if (lightPixels.has([newX, newY].join())) {
                    currentBinaryNumber += '1';
                } else {
                    if (i % 2 === 1 && (newX < minX || newX > maxX || newY < minY || newY > maxY) && arr[0][0] === '#') {
                        currentBinaryNumber += '1';
                    } else {
                        currentBinaryNumber += '0';
                    }
                }
            }
            const decimalNumber = parseInt(currentBinaryNumber, 2);
            if (arr[0][decimalNumber] === '#') {
                newLightPixels.add([j, k].join());
            }
        }
    }
    minX -= 1;
    maxX += 1;
    minY -= 1;
    maxY += 1;
    lightPixels = cloneDeep(newLightPixels);
    newLightPixels.clear();
}

console.log(lightPixels.size);