// Really slow and off by one on the sample input, maybe will come back to this later
// Very similar to AOC 2023 Day 17

const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const possibleRisks = new Set();

const directionArray = [[0, 1], [1, 0], [-1, 0], [0, -1]];

const frontier = [];

frontier.push({currentSum: -1, visited: new Set(), currentPosition: '0,0'}); // currentSum value is hardcoded

findPath();


function findPath() {
    while (frontier.length !== 0) {
        const currentObject = frontier.shift();
        currentObject.visited.add(currentObject.currentPosition);
        const [x, y] = currentObject.currentPosition.split(',').map(e => parseInt(e));
        newSum = currentObject.currentSum + parseInt(arr[y][x]);
        if (x === arr[y].length - 1 && y === arr.length - 1) {
            possibleRisks.add(currentObject.currentSum);
            continue;
        } else {
            for (const direction of directionArray) {
                const [directionX, directionY] = direction.map(coordinate => parseInt(coordinate));
                const newX = x + directionX;
                const newY = y + directionY;
                if (newX > arr[y].length - 1) {
                    continue;
                }
                if (newX < 0) {
                    continue;
                }
                if (newY > arr.length - 1) {
                    continue;
                }
                if (newY < 0) {
                    continue;
                }
                if (!currentObject.visited.has(newX + ',' + newY)) {
                    if (!frontier.findIndex(element => element.currentPosition === newX + ',' + newY) !== -1) {
                        frontier.push({currentSum: newSum, visited: currentObject.visited, currentPosition: newX + ',' + newY});
                    }
                }
            }
        }
    }
}

console.log(possibleRisks);