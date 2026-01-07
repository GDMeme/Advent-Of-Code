const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// go from S to E

let start = {};
let breakBoolean = false;
for (let i = 0; i < arr.length; i++) { // find S
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 'S') {
            start = {distance: 0, x: j, y: i};
            arr[i] = arr[i].slice(1); // hardcoded
            arr[i] = 'a' + arr[i];
            breakBoolean = true;
            break;
        }
    }
    if (breakBoolean) {
        break;
    }
}
let width = arr[0].length;

function checkNeighbours(distance, a, b) {
    if (!reached.some(coordinate => coordinate.x === a && coordinate.y === b - 1) && ((b - 1) >= 0)) { // up
        if (!frontier.some(coordinate => coordinate.x === a && coordinate.y === b - 1)){
            if ((arr[b][a].charCodeAt(0) - arr[b - 1][a].charCodeAt(0) >= -1)) {
                frontier.push({distance: distance + 1, x: a, y: b - 1});
            }
        }
    }
    if (!reached.some(coordinate => coordinate.x === a && coordinate.y === b + 1) && ((b + 1) < arr.length)) { // down
        if (!frontier.some(coordinate => coordinate.x === a && coordinate.y === b + 1)) {
            if ((arr[b][a].charCodeAt(0) - arr[b + 1][a].charCodeAt(0) >= -1)) {
            frontier.push({distance: distance + 1, x: a, y: b + 1});
            }
        }
    }
    if (!reached.some(coordinate => coordinate.x === a + 1 && coordinate.y === b) && ((a + 1) < width)) { // right
        if (!frontier.some(coordinate => coordinate.x === a + 1 && coordinate.y === b)){
            if ((arr[b][a].charCodeAt(0) - arr[b][a + 1].charCodeAt(0) >= -1)) {
                frontier.push({distance: distance + 1, x: a + 1, y: b});
            }
        }
    }
    if (!reached.some(coordinate => coordinate.x === a - 1 && coordinate.y === b) && ((a - 1) >= 0)) { // left
        if (!frontier.some(coordinate => coordinate.x === a - 1 && coordinate.y === b)) {
            if ((arr[b][a].charCodeAt(0) - arr[b][a - 1].charCodeAt(0) >= -1)) {
                frontier.push({distance: distance + 1, x: a - 1, y: b});
            }
        }
    }
    if (arr[b][a] === 'z') { // will have already pushed other z's to frontier
        if (arr[b - 1][a] === 'E') {
            return {distance: distance + 1, x: a, y: b - 1};
        } else if (arr[b + 1][a] === 'E') {
            return {distance: distance + 1, x: a, y: b + 1};
        } else if (arr[b][a + 1] === 'E') {
            return {distance: distance + 1, x: a + 1, y: b};
        } else if (arr[b][a - 1] === 'E') { // left
            return {distance: distance + 1, x: a - 1, y: b};
        }
    }
}
let frontier = [];
let reached = [{x: start.x, y: start.y}];
let endCoordinates = {};
checkNeighbours(start.distance, start.x, start.y);
while (frontier.length > 0) {
    currentValue = frontier.shift();
    let end = checkNeighbours(currentValue.distance, currentValue.x, currentValue.y);
    if (!reached.some(coordinate => coordinate.x === currentValue.x && coordinate.y === currentValue.y)) { // don't put duplicates in reached
        reached.push({x: currentValue.x, y: currentValue.y}); // don't put the distance in reached
    }
    if (end) {
        endCoordinates = end;
        break;
    }
}
console.log(endCoordinates.distance);