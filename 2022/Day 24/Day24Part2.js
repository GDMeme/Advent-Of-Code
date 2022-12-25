const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const t0 = performance.now();

let currentWindSet = new Set();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '<') {
            currentWindSet.add({coordinate: j + ',' + i, direction: 'L'});
        } else if (arr[i][j] === '>') {
            currentWindSet.add({coordinate: j + ',' + i, direction: 'R'});
        } else if (arr[i][j] === '^') {
            currentWindSet.add({coordinate: j + ',' + i, direction: 'U'});
        } else if (arr[i][j] === 'v') {
            currentWindSet.add({coordinate: j + ',' + i, direction: 'D'});
        }
    }
}

// console.log('wind:', currentWindSet);

let trueWidth = arr[0].length;
let trueHeight = arr.length;

let currentPositionSet = new Set();

currentPositionSet.add('1,0');

let newCurrentPositionSet = new Set();

let newWindSet = new Set();
let noDirectionWindSet = new Set();

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0], [0, 0]];

let minuteCounter = 0;

while (true) {
    for (const wind of currentWindSet) {
        const [currentX, currentY] = wind.coordinate.split(',').map(number => parseInt(number));
        const { direction } = wind;
        if (direction === 'L') {
            if (currentX === 1) {
                newWindSet.add({coordinate: (trueWidth - 2) + ',' + currentY, direction});
                noDirectionWindSet.add((trueWidth - 2) + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX - 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX - 1) + ',' + currentY);
            }
        } else if (direction === 'R') {
            if (currentX === trueWidth - 2) {
                newWindSet.add({coordinate: 1 + ',' + currentY, direction});
                noDirectionWindSet.add(1 + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX + 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX + 1) + ',' + currentY);
            }
        } else if (direction === 'U') {
            if (currentY === 1) {
                newWindSet.add({coordinate: currentX + ',' + (trueHeight - 2), direction});
                noDirectionWindSet.add(currentX + ',' + (trueHeight - 2));
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY - 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY - 1));
            }
        } else { // direction = 'D'
            if (currentY === trueHeight - 2) {
                newWindSet.add({coordinate: currentX + ',' + 1, direction});
                noDirectionWindSet.add(currentX + ',' + 1);
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY + 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY + 1));
            }
        }
    }
    // console.log('new wind:', newWindSet);
    for (const currentPosition of currentPositionSet) {
        const [currentPositionX, currentPositionY] = currentPosition.split(',').map(number => parseInt(number));
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            const newCurrentPositionX = currentPositionX + directionX;
            const newCurrentPositionY = currentPositionY + directionY;
            if (newCurrentPositionX === 0 || newCurrentPositionX === trueWidth - 1) {
                continue;
            }
            if (newCurrentPositionY === 0 && newCurrentPositionX !== 1) {
                continue;
            } 
            if (newCurrentPositionY === trueHeight - 1 && newCurrentPositionX !== trueWidth - 2) {
                continue;
            }
            if (!noDirectionWindSet.has(newCurrentPositionX + ',' + newCurrentPositionY)){
                newCurrentPositionSet.add(newCurrentPositionX + ',' + newCurrentPositionY);
            }
        }
    }
    minuteCounter++;
    if (newCurrentPositionSet.has((trueWidth - 2) + ',' + (trueHeight - 1))) {
        currentWindSet = cloneDeep(newWindSet);
        currentPositionSet = cloneDeep(newCurrentPositionSet);
        newWindSet.clear();
        newCurrentPositionSet.clear();
        noDirectionWindSet.clear();
        break;
    }
    // console.log('newcurrentpositionset', newCurrentPositionSet);
    currentWindSet = cloneDeep(newWindSet);
    currentPositionSet = cloneDeep(newCurrentPositionSet);
    newWindSet.clear();
    newCurrentPositionSet.clear();
    noDirectionWindSet.clear();
}
console.log('first part', minuteCounter);

currentPositionSet.clear();
currentPositionSet.add((trueWidth - 2) + ',' + (trueHeight - 1));

while (true) { // GOING BACK TO THE START
    for (const wind of currentWindSet) {
        const [currentX, currentY] = wind.coordinate.split(',').map(number => parseInt(number));
        const { direction } = wind;
        if (direction === 'L') {
            if (currentX === 1) {
                newWindSet.add({coordinate: (trueWidth - 2) + ',' + currentY, direction});
                noDirectionWindSet.add((trueWidth - 2) + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX - 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX - 1) + ',' + currentY);
            }
        } else if (direction === 'R') {
            if (currentX === trueWidth - 2) {
                newWindSet.add({coordinate: 1 + ',' + currentY, direction});
                noDirectionWindSet.add(1 + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX + 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX + 1) + ',' + currentY);
            }
        } else if (direction === 'U') {
            if (currentY === 1) {
                newWindSet.add({coordinate: currentX + ',' + (trueHeight - 2), direction});
                noDirectionWindSet.add(currentX + ',' + (trueHeight - 2));
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY - 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY - 1));
            }
        } else { // direction = 'D'
            if (currentY === trueHeight - 2) {
                newWindSet.add({coordinate: currentX + ',' + 1, direction});
                noDirectionWindSet.add(currentX + ',' + 1);
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY + 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY + 1));
            }
        }
    }
    // console.log('new wind:', newWindSet);
    for (const currentPosition of currentPositionSet) {
        const [currentPositionX, currentPositionY] = currentPosition.split(',').map(number => parseInt(number));
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            const newCurrentPositionX = currentPositionX + directionX;
            const newCurrentPositionY = currentPositionY + directionY;
            if (newCurrentPositionX === 0 || newCurrentPositionX === trueWidth - 1) {
                continue;
            }
            if (newCurrentPositionY === 0 && newCurrentPositionX !== 1) {
                continue;
            } 
            if (newCurrentPositionY === trueHeight - 1 && newCurrentPositionX !== trueWidth - 2) {
                continue;
            }
            if (!noDirectionWindSet.has(newCurrentPositionX + ',' + newCurrentPositionY)){
                newCurrentPositionSet.add(newCurrentPositionX + ',' + newCurrentPositionY);
            }
        }
    }
    minuteCounter++;
    if (newCurrentPositionSet.has('1,0')) {
        currentWindSet = cloneDeep(newWindSet);
        currentPositionSet = cloneDeep(newCurrentPositionSet);
        newWindSet.clear();
        newCurrentPositionSet.clear();
        noDirectionWindSet.clear();
        break;
    }
    currentWindSet = cloneDeep(newWindSet);
    currentPositionSet = cloneDeep(newCurrentPositionSet);
    newWindSet.clear();
    newCurrentPositionSet.clear();
    noDirectionWindSet.clear();
}

console.log('second part', minuteCounter);

currentPositionSet.clear();
currentPositionSet.add('1,0');

while (true) { // GOING BACK TO THE END
    for (const wind of currentWindSet) {
        const [currentX, currentY] = wind.coordinate.split(',').map(number => parseInt(number));
        const { direction } = wind;
        if (direction === 'L') {
            if (currentX === 1) {
                newWindSet.add({coordinate: (trueWidth - 2) + ',' + currentY, direction});
                noDirectionWindSet.add((trueWidth - 2) + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX - 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX - 1) + ',' + currentY);
            }
        } else if (direction === 'R') {
            if (currentX === trueWidth - 2) {
                newWindSet.add({coordinate: 1 + ',' + currentY, direction});
                noDirectionWindSet.add(1 + ',' + currentY);
            } else {
                newWindSet.add({coordinate: (currentX + 1) + ',' + currentY, direction});
                noDirectionWindSet.add((currentX + 1) + ',' + currentY);
            }
        } else if (direction === 'U') {
            if (currentY === 1) {
                newWindSet.add({coordinate: currentX + ',' + (trueHeight - 2), direction});
                noDirectionWindSet.add(currentX + ',' + (trueHeight - 2));
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY - 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY - 1));
            }
        } else { // direction = 'D'
            if (currentY === trueHeight - 2) {
                newWindSet.add({coordinate: currentX + ',' + 1, direction});
                noDirectionWindSet.add(currentX + ',' + 1);
            } else {
                newWindSet.add({coordinate: currentX + ',' + (currentY + 1), direction});
                noDirectionWindSet.add(currentX + ',' + (currentY + 1));
            }
        }
    }
    // console.log('new wind:', newWindSet);
    for (const currentPosition of currentPositionSet) {
        const [currentPositionX, currentPositionY] = currentPosition.split(',').map(number => parseInt(number));
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            const newCurrentPositionX = currentPositionX + directionX;
            const newCurrentPositionY = currentPositionY + directionY;
            if (newCurrentPositionX === 0 || newCurrentPositionX === trueWidth - 1) {
                continue;
            }
            if (newCurrentPositionY === 0 && newCurrentPositionX !== 1) {
                continue;
            } 
            if (newCurrentPositionY === trueHeight - 1 && newCurrentPositionX !== trueWidth - 2) {
                continue;
            }
            if (!noDirectionWindSet.has(newCurrentPositionX + ',' + newCurrentPositionY)){
                newCurrentPositionSet.add(newCurrentPositionX + ',' + newCurrentPositionY);
            }
        }
    }
    minuteCounter++;
    if (newCurrentPositionSet.has((trueWidth - 2) + ',' + (trueHeight - 1))) {
        currentWindSet = cloneDeep(newWindSet);
        currentPositionSet = cloneDeep(newCurrentPositionSet);
        newWindSet.clear();
        newCurrentPositionSet.clear();
        noDirectionWindSet.clear();
        break;
    }
    currentWindSet = cloneDeep(newWindSet);
    currentPositionSet = cloneDeep(newCurrentPositionSet);
    newWindSet.clear();
    newCurrentPositionSet.clear();
    noDirectionWindSet.clear();
}
console.log('last part', minuteCounter);

const t1 = performance.now();

console.log('ans:', minuteCounter);

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);