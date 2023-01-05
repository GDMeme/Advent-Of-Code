const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

let breakOuter = false;

for (let i = 0; i < arr.length - 1; i++) {
    if (breakOuter) {
        break;
    }
    for (let j = 0; j < arr.length; j++) {
        if (i === j) {
            continue;
        }
        if (arr[i] + arr[j] === 2020) {
            console.log(arr[i] * arr[j]);
            breakOuter = true;
            break;
        }
    }
}