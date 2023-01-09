const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const estimateNumber = parseInt(arr[0]);

const possibleBusArray = arr[1].split(',');

const possibleBus = new Set();

for (const elem of possibleBusArray) {
    if (elem !== 'x') {
        possibleBus.add(parseInt(elem));
    }
}

let min = Number.MAX_SAFE_INTEGER;

let winner = 0;

for (const elem of possibleBus) {
    const quotient = Math.ceil(estimateNumber / elem);
    const difference = (quotient * elem) - estimateNumber;
    if (difference < min) {
        min = difference;
        winner = elem;
    }
}

console.log(winner * min);