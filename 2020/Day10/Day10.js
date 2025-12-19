const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

arr.sort(function (a, b) {
    return a - b;
});

arr.unshift(0);
arr.push([arr[-1] + 3]);

let oneDifferenceCounter = 0;
let threeDifferenceCounter = 0;

for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] - arr[i] === 1) {
        oneDifferenceCounter++;
    } else if (arr[i + 1] - arr[i] === 3) {
        threeDifferenceCounter++;
    }
}

console.log(oneDifferenceCounter * threeDifferenceCounter);