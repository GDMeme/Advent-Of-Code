const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let activeCubes = new Set();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '#') {
            activeCubes.add([j, i, 0, 0].join());
        }
    }
}

let maxX = 9;
let minX = -2;
let maxY = 9;
let minY = -2;
let maxZ = 2;
let minZ = -2;
let maxW = 2;
let minW = -2;

const rounds = 6;

const directionArray = [];

for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
            for (let l = -1; l <= 1; l++) {
                if (i === 0 && j === 0 && k === 0 && l === 0) {
                    continue;
                }
                directionArray.push([i, j, k, l]);
            }
        }
    }
}

const newActiveCubes = new Set();

for (let round = 0; round < rounds; round++) {
    newActiveCubes.clear();
    for (let i = minX; i <= maxX; i++) {
        for (let j = minY; j <= maxY; j++) {
            for (let k = minZ; k <= maxZ; k++) {
                for (let l = minW; l <= maxW; l++) {
                    let counter = 0;
                    const active = activeCubes.has([i, j, k, l].join()); 
                    for (const [directionX, directionY, directionZ, directionW] of directionArray) {
                        const newX = i + directionX;
                        const newY = j + directionY;
                        const newZ = k + directionZ;
                        const newW = l + directionW;
                        if (activeCubes.has([newX, newY, newZ, newW].join())) {
                            counter++;
                        }
                    }
                    if (active && (counter === 2 || counter === 3)) {
                        newActiveCubes.add([i, j, k, l].join());
                    }
                    if (!active && counter === 3) {
                        newActiveCubes.add([i, j, k, l].join());
                    }
                }
            }
        }
    }
    activeCubes = cloneDeep(newActiveCubes);
    maxX += 2;
    minX -= 2;
    maxY += 2;
    minY -= 2;
    maxZ += 2;
    minZ -= 2;
    maxW += 2;
    minW -= 2;
}

console.log(activeCubes.size);