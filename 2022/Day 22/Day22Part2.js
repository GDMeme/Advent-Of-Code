const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const t0 = performance.now();

let openTiles = new Set();
let solidWalls = new Set();

let instructionsIndex = 0;
for (let i = 0; i < arr.length; i++) { 
    if (!isNaN(parseInt(arr[i][0]))) {
        instructionsIndex = i;
        break;
    } else {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === ' ') {
                continue;
            } else if (arr[i][j] === '.') {
                openTiles.add((j + 1) + ',' + (i + 1));
            } else {
                solidWalls.add((j + 1) + ',' + (i + 1));
            }
        }
    }
}

let instructions = arr[instructionsIndex];
let instructionsArr = [];

for (let i = 0; i < instructions.length; i++) {
    let currentNumber = '';
    while (instructions[i] !== 'R' && instructions[i] !== 'L' && instructions[i]) {
        currentNumber += instructions[i];
        i++;
    }
    currentNumber = parseInt(currentNumber);
    instructionsArr.push(currentNumber);
    if (instructions[i]) {
        instructionsArr.push(instructions[i]);
    }
}


let directionArray = ['R', 'D', 'L', 'U'];

let currentStartingPosition = '';

for (let i = 0; i < arr[0].length; i++) {
    let currentPosition = i + ',1';
    if (openTiles.has(currentPosition)) {
        currentStartingPosition = currentPosition;
        break;
    }
}
// currentStartingPosition looks like 51,1

let [currentX, currentY] = currentStartingPosition.split(',');

let currentDirectionIndex = 0;
let currentDirection = 'R';

for (let i = 0; i < instructionsArr.length; i++) {
    if (currentDirectionIndex < 0) {
        currentDirectionIndex += 4;
    } else {
        currentDirectionIndex = currentDirectionIndex % 4;
    }
    currentDirection = directionArray[currentDirectionIndex]
    if (instructionsArr[i] === 'R') {
        currentDirectionIndex++;
        continue;
    } else if (instructionsArr[i] === 'L') {
        currentDirectionIndex--;
        continue;
    } else { // IT'S A NUMBER
        for (let j = 0; j < instructionsArr[i]; j++) {
            if (currentDirection === 'R') {
                if (openTiles.has((currentX + 1) + ',' + currentY)) {
                    currentX += 1;
                    continue;
                } else if (solidWalls.has((currentX + 1) + ',' + currentY)) {
                    break; // don't increment currentX
                } else { // out of bounds
                    if (currentY < 51) {
                        if (solidWalls.has('100,' + (151 - currentY))) {
                            break; // don't change currentX or currentY
                        }
                        currentY = 151 - currentY;
                        currentX = 100;
                        currentDirectionIndex = 2;
                        currentDirection = 'L';
                        continue;
                    } else if (currentY < 101) {
                        if (solidWalls.has((currentY + 50) + ',50')) {
                            break; // don't change currentX or currentY
                        }
                        currentX = currentY + 50;
                        currentY = 50;
                        currentDirectionIndex = 3;
                        currentDirection = 'U';
                        continue;
                    } else if (currentY < 151) {
                        if (solidWalls.has('150,' + (151 - currentY))) {
                            break; // don't change currentX or currentY
                        }
                        currentX = 150;
                        currentY = 151 - currentY;
                        currentDirectionIndex = 2;
                        currentDirection = 'L'
                        continue;
                    } else {
                        if (solidWalls.has((currentY - 100) + ',150')) {
                            break; // don't change currentX or currentY
                        }
                        currentX = currentY - 100;
                        currentY = 150;
                        currentDirectionIndex = 3;
                        currentDirection = 'U'
                        continue;
                    }
                }
            } else if (currentDirection === 'D') {
                if (openTiles.has(currentX + ',' + (currentY + 1))) {
                    currentY += 1;
                    continue;
                } else if (solidWalls.has(currentX + ',' + (currentY + 1))) {
                    break; // don't increment currentY
                } else { // out of bounds
                    if (currentX < 51) {
                        if (solidWalls.has((currentX + 100) + ',1')) {
                            break; // don't change currentX or currentY
                        }
                        currentX += 100;
                        currentY = 1; // doesn't change direction
                        continue;
                    } else if (currentX < 101) {
                        if (solidWalls.has(('50,' + (currentX + 100)))) {
                            break; // don't change currentX
                        }
                        currentY = currentX + 100;
                        currentX = 50;
                        currentDirectionIndex = 2;
                        currentDirection = 'L'
                        continue;
                    } else {
                        if (solidWalls.has('100,' + currentX)) {
                            break; // don't change currentX or currentY
                        }
                        currentY = currentX;
                        currentX = 100;
                        currentDirectionIndex = 2;
                        currentDirection = 'L';
                        continue;
                    }
                }
            } else if (currentDirection === 'L') {
                if (openTiles.has((currentX - 1) + ',' + currentY)) {
                    currentX -= 1;
                    continue;
                } else if (solidWalls.has((currentX - 1) + ',' + currentY)) {
                    break; // don't decrement currentX
                } else { // out of bounds
                    if (currentY < 51) {
                        if (solidWalls.has('1,' + (151 - currentY))) {
                            break; // don't change currentX or currentY
                        }
                        currentX = 1;
                        currentY = 151 - currentY;
                        currentDirectionIndex = 0;
                        currentDirection = 'R';
                        continue;
                    } else if (currentY < 101) {
                        if (solidWalls.has((currentY - 50) + ',101')) {
                            break; // don't change currentX or currentY
                        }
                        currentX = currentY - 50;
                        currentY = 101;
                        currentDirectionIndex = 1;
                        currentDirection = 'D';
                        continue;
                    } else if (currentY < 151) {
                        if (solidWalls.has('51,' + (151 - currentY))) {
                            break; // don't change currentX or currentY
                        }
                        currentX = 51;
                        currentY = 151 - currentY;
                        currentDirectionIndex = 0;
                        currentDirection = 'R';
                        continue;
                    } else {
                        if (solidWalls.has((currentY - 100) + ',1')) {
                            break; // don't change currentX or currentY
                        }
                        currentX = currentY - 100;
                        currentY = 1;
                        currentDirectionIndex = 1;
                        currentDirection = 'D';
                        continue;
                    }
                }
            } else { // 'U'
                if (openTiles.has(currentX + ',' + (currentY - 1))) {
                    currentY -= 1;
                    continue;
                } else if (solidWalls.has(currentX + ',' + (currentY - 1))) {
                    break; // don't decrement currentY
                } else { // out of bounds
                    if (currentX < 51) {
                        if (solidWalls.has('51,' + (currentX + 50))) {
                            break; // don't change currentX or currentY
                        }
                        currentY = currentX + 50;
                        currentX = 51;
                        currentDirectionIndex = 0;
                        currentDirection = 'R';
                        continue;
                    } else if (currentX < 101) {
                        if (solidWalls.has('1,' + (currentX + 100))) {
                            break; // don't change currentX or currentY
                        }
                        currentY = currentX + 100;
                        currentX = 1;
                        currentDirectionIndex = 0;
                        currentDirection = 'R';
                        continue;
                    } else {
                        if (solidWalls.has((currentX - 100) + ',200')) {
                            break; // don't change currentX or currentY
                        }
                        currentX -= 100;
                        currentY = 200; // doesn't change direction
                        continue;
                    }
                }
            }
        }
    }
}

const t1 = performance.now();

console.log('ans:', (currentY * 1000) + (currentX * 4) + currentDirectionIndex);

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);