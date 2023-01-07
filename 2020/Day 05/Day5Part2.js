const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const seatIDSet = new Set();

for (const elem of arr) {
    const FBstring = elem.slice(0, 7);
    let upperBound = 127;
    let lowerBound = 0;
    let row = 0;
    for (const letter of FBstring) {
        if (letter === 'F') {
            upperBound = Math.floor((upperBound + lowerBound) / 2);
        } else {
            lowerBound = Math.ceil((upperBound + lowerBound) / 2);
        }
    }
    row = upperBound; // could also be lowerbound
    const LRstring = elem.slice(-3);
    upperBound = 7;
    lowerBound = 0;
    let column = 0;
    for (const letter of LRstring) {
        if (letter === 'L') {
            upperBound = Math.floor((upperBound + lowerBound) / 2);
        } else {
            lowerBound = Math.ceil((upperBound + lowerBound) / 2);
        }
    }
    column = upperBound; // could also be lowerbound

    const seatID = 8 * row + column;

    seatIDSet.add(seatID);
}

let currentCounter = 54; // from part 1 testing

while (currentCounter <= 930) {
    if (seatIDSet.has(currentCounter + 1) && seatIDSet.has(currentCounter - 1) && !seatIDSet.has(currentCounter)) {
        console.log(currentCounter);
        break;
    }
    currentCounter++;
}