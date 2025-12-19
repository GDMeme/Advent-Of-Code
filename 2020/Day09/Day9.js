const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

let possibleSums = [];

for (let i = 0; i < arr.length - 25; i++) {
    for (let j = 0; j < 24; j++) {
        for (let k = j + 1; k < 25; k++) {
            possibleSums.push(arr[i + j] + arr[i + k]);
        }
    }
    if (!possibleSums.includes(arr[i + 25])) {
        break;
    }
    possibleSums.length = 0;
}