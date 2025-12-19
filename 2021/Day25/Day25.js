const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let eastFacingCucumbers = new Set();
let southFacingCucumbers = new Set();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '>') {
            eastFacingCucumbers.add([j, i].join());
        } else if (arr[i][j] === 'v') {
            southFacingCucumbers.add([j, i].join());
        }
    }
}

const newEastFacingCucumbers = new Set();
const newSouthFacingCucumbers = new Set();

let currentStep = 0;

while (true) {
    let eastNoMove = true;
    newEastFacingCucumbers.clear();
    for (const elem of eastFacingCucumbers) {
        const [x, y] = elem.split(',').map(e => parseInt(e));
        let nextSpot = x + 1;
        if (x + 1 >= arr[0].length) { // 0 is arbitrary
            nextSpot = 0;
        }
        if (eastFacingCucumbers.has([nextSpot, y].join())) {
            newEastFacingCucumbers.add([x, y].join());
            continue;
        } else if (southFacingCucumbers.has([nextSpot, y].join())) {
            newEastFacingCucumbers.add([x, y].join());
            continue;
        } else {
            newEastFacingCucumbers.add([nextSpot, y].join());
            eastNoMove = false;
        }
    }
    
    let southNoMove = true;
    newSouthFacingCucumbers.clear();
    for (const elem of southFacingCucumbers) {
        const [x, y] = elem.split(',').map(e => parseInt(e));
        let nextSpot = y + 1;
        if (y + 1 >= arr.length) {
            nextSpot = 0;
        }
        if (newEastFacingCucumbers.has([x, nextSpot].join())) {
            newSouthFacingCucumbers.add([x, y].join());
            continue;
        } else if (southFacingCucumbers.has([x, nextSpot].join())) {
            newSouthFacingCucumbers.add([x, y].join());
            continue;
        } else {
            newSouthFacingCucumbers.add([x, nextSpot].join());
            southNoMove = false;
        }
    }
    currentStep++;

    eastFacingCucumbers = cloneDeep(newEastFacingCucumbers);
    southFacingCucumbers = cloneDeep(newSouthFacingCucumbers);
    if (southNoMove && eastNoMove) {
        break;
    }
}

console.log('ans', currentStep);