const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let coordinateSet = new Set();

let nowFold = false;

let foldLines = [];

for (const item of arr) {
    if (item === '') {
        nowFold = true;
        continue;
    }
    if (!nowFold) {
        coordinateSet.add(item);
    } else {
        foldLines.push(item.split(' ')[2]);
    }
}

for (const fold of foldLines) {
    const newSet = new Set();
    const [direction, coordinate] = fold.split('=');
    if (direction === 'x') {
        for (const item of coordinateSet) {
            const [xCoordinate, yCoordinate] = item.split(',').map(number => parseInt(number));
            if (xCoordinate > coordinate) {
                const newXCoordinate = - xCoordinate + (2 * coordinate);
                newSet.add(newXCoordinate + ',' + yCoordinate);
            } else {
                newSet.add(item);
            }
        }
    } else if (direction === 'y') {
        for (const item of coordinateSet) {
            const [xCoordinate, yCoordinate] = item.split(',').map(number => parseInt(number));
            if (yCoordinate > coordinate) {
                const newYCoordinate = - yCoordinate + (2 * coordinate);
                newSet.add(xCoordinate + ',' + newYCoordinate);
            } else {
                newSet.add(item);
            }
        }
    }
    coordinateSet = cloneDeep(newSet);
}

const visualizeArray = [[], [], [], [], [], []];

for (const item of coordinateSet) {
    const [xCoordinate, yCoordinate] = item.split(',').map(number => parseInt(number));
    visualizeArray[yCoordinate][xCoordinate] = '#';
}

for (let i = 0; i < visualizeArray.length; i++) {
    for (let j = 0; j < visualizeArray[i].length; j++) {
        if (visualizeArray[i][j] !== '#') {
            visualizeArray[i][j] = '.';
        }
    }
}

for (const item of visualizeArray) {
    console.log(JSON.stringify(item));
}
