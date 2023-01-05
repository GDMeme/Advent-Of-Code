const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let currentRowCounter = 0;
let currentPosition = '0,0';
let finalAnswer = 1;

finalAnswer *= findTrees(0, '0,0', 0, 1, 1);
finalAnswer *= findTrees(0, '0,0', 0, 3, 1);
finalAnswer *= findTrees(0, '0,0', 0, 5, 1);
finalAnswer *= findTrees(0, '0,0', 0, 7, 1);
finalAnswer *= findTrees(0, '0,0', 0, 1, 2);

console.log(finalAnswer);

function findTrees (currentRowCounter, currentPosition, treeCounter, run, rise) {
    while (currentRowCounter < arr.length - 1) { // skips 0,0 but not a tree
        let [x, y] = currentPosition.split(',').map(e => parseInt(e));
        x += run;
        y += rise;
        if (x > arr[0].length - 1) { // 0 is arbitrary
            x = x % arr[0].length;
        }
        if (arr[y][x] === '#') {
            treeCounter++;
        }
        currentPosition = [x, y].join();
        currentRowCounter += rise;
    }
    return treeCounter;
}