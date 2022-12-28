const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const t0 = performance.now();

let visited = new Set();

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const largestBasin = [];

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== '9' && !visited.has(j + ',' + i)) {
            largestBasin.push(findPath(0, [j + ',' + i]));
        }
    }
}

function findPath(counter, frontier) { // only calls this in a new path
    // returns an int equal to the size of the basin'
    while (frontier.length !== 0) {
        const [x, y] = frontier.shift().split(',').map(coordinate => parseInt(coordinate));
        visited.add(x + ',' + y);
        counter++;
        for (const [directionX, directionY] of directionArray) {
            newXCoordinate = x + directionX;
            newYCoordinate = y + directionY;
            if (newXCoordinate < 0) {
                continue;
            }
            if (newXCoordinate >= arr[y].length) {
                continue;
            }
            if (newYCoordinate < 0) {
                continue;
            }
            if (newYCoordinate >= arr.length) {
                continue;
            }
            if (arr[newYCoordinate][newXCoordinate] === '9') {
                continue;
            } else {
                if (!frontier.includes(newXCoordinate + ',' + newYCoordinate)) {
                    if (!visited.has(newXCoordinate + ',' + newYCoordinate)) {
                        frontier.push(newXCoordinate + ',' + newYCoordinate);
                    }
                }
            }
        }
    }
    return counter;
}

let first = 0;
let second = 0;
let third = 0;

for (const number of largestBasin) {
    if (number > third) {
        if (number > second) {
            if (number > first) {
                third = second;
                second = first;
                first = number;
            } else {
                third = second;
                second = number;
            }
        } else {
            third = number;
        }
    }
}

console.log('ans:', first * second * third);

const t1 = performance.now();

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);