const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let sum = 0;

for (let i = 0; i < arr.length; i++) {
    const letterCounter = new Set();
    while (arr[i]) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!letterCounter.has(arr[i][j])) {
                letterCounter.add(arr[i][j]);
            }
        }
        i++;
    }
    sum += letterCounter.size;
}

console.log(sum);