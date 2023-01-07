const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let max = 0;

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

    if (seatID > max) {
        max = seatID;
    }
}

console.log(max);