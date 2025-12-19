const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let currentRowCounter = 0;

let currentPosition = '0,0';

let treeCounter = 0;

while (currentRowCounter < arr.length - 1) { // skips 0,0 but not a tree
    let [x, y] = currentPosition.split(',').map(e => parseInt(e));
    x += 3;
    y += 1;
    if (x > arr[0].length - 1) { // 0 is arbitrary
        x = x % arr[0].length;
    }
    if (arr[y][x] === '#') {
        treeCounter++;
    }
    currentPosition = [x, y].join();
    currentRowCounter++;
}

console.log(treeCounter);