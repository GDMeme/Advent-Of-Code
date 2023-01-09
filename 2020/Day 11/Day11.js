const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let currentEmptySeatSet = new Set();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 'L') {
            currentEmptySeatSet.add([j, i].join());
        }
    }
}

let newEmptySeatSet = new Set();

let currentOccupiedSeatSet = new Set();
let newOccupiedSeatSet = new Set();

const directionArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

while (true) {
    for (const elem of currentEmptySeatSet) {
        const [x, y] = elem.split(',').map(e => parseInt(e));
        let found = false;
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            newX = x + directionX;
            newY = y + directionY;
            if (currentOccupiedSeatSet.has([newX, newY].join())) {
                found = true;
                break;
            }
        }
        if (!found) {
            newOccupiedSeatSet.add(elem);
        } else {
            newEmptySeatSet.add(elem);
        }
    }
    for (const elem of currentOccupiedSeatSet) {
        const [x, y] = elem.split(',').map(e => parseInt(e));
        let counter = 0;
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            newX = x + directionX;
            newY = y + directionY;
            if (currentOccupiedSeatSet.has([newX, newY].join())) {
                counter++;
            }
        }
        if (counter >= 4) {
            newEmptySeatSet.add(elem);
        } else {
            newOccupiedSeatSet.add(elem);
        }
    }
    let noSeatChange = true;
    if (newEmptySeatSet.size === currentEmptySeatSet.size) {
        for (const elem of newEmptySeatSet) {
            if (!currentEmptySeatSet.has(elem)) {
                noSeatChange = false;
                break;
            }
        }
    } else {
        noSeatChange = false;
    }
    if (noSeatChange && (newOccupiedSeatSet.size === currentOccupiedSeatSet.size)) {
        for (const elem of newOccupiedSeatSet) {
            if (!currentOccupiedSeatSet.has(elem)) {
                noSeatChange = false;
                break;
            }
        }
    } else {
        noSeatChange = false;
    }
    if (noSeatChange) {
        break;
    }
    currentEmptySeatSet = cloneDeep(newEmptySeatSet);
    currentOccupiedSeatSet = cloneDeep(newOccupiedSeatSet);

    newEmptySeatSet.clear();
    newOccupiedSeatSet.clear();
}

console.log(currentOccupiedSeatSet.size);