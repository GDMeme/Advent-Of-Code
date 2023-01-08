const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let sum = 0;

for (let i = 0; i < arr.length; i++) {
    let letterCounter = new Set();
    for (let j = 0; j < arr[i].length; j++) {
        if (!letterCounter.has(arr[i][j])) {
            letterCounter.add(arr[i][j]);
        }
    }
    i++;
    while (arr[i]) {
        const newLetterCounter = new Set();
        for (let j = 0; j < arr[i].length; j++) {
            if (letterCounter.has(arr[i][j])) {
                newLetterCounter.add(arr[i][j]);
            }
        }
        i++;
        letterCounter = cloneDeep(newLetterCounter);
    }
    sum += letterCounter.size;
}

console.log(sum);