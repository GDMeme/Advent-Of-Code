const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

// Helper function for visualization
function printRockCoords(rockCoords, tallestHeight) {
    for (let y = tallestHeight; y >= 1; y--) {
        let row = '';
        for (let x = 0; x <= 6; x++) {
            row += rockCoords.has(`${x},${y}`) ? '#' : '.';
        }
        console.log(row);
    }
}

function doWindPush(windCounter, currentRock, rockCoords) {
    let currentWindDirection = arr[0][windCounter % arr[0].length];
    if (currentWindDirection === '<') {
        if (Math.min(...currentRock.map(e => e[0])) > 0 && !currentRock.some(rock => rockCoords.has(`${rock[0] - 1},${rock[1]}`))) {
            currentRock = currentRock.map(rock => [rock[0] - 1, rock[1]]);
        }
    } else { // '>'
        if (Math.max(...currentRock.map(e => e[0])) < 6 && !currentRock.some(rock => rockCoords.has(`${rock[0] + 1},${rock[1]}`))) {
            currentRock = currentRock.map(rock => [rock[0] + 1, rock[1]]);
        }
    }
    return currentRock;
}

function dropRock(shape, heightToStart, rockCoords, windCounter, tallestHeight) {
    let stop = false;
    let currentRock = shape.map(([x, y]) => [x, y + heightToStart]);
    let localTallest = tallestHeight;
    while (!stop) {
        currentRock = doWindPush(windCounter.value, currentRock, rockCoords);
        windCounter.value++;
        if (currentRock.some(rock => rockCoords.has(`${rock[0]},${rock[1] - 1}`))) {
            stop = true;
            for (let k = 0; k < currentRock.length; k++) {
                rockCoords.add(`${currentRock[k][0]},${currentRock[k][1]}`);
                if (currentRock[k][1] > localTallest) {
                    localTallest = currentRock[k][1];
                }
            }
            break;
        }
        currentRock = currentRock.map(height => [height[0], height[1] - 1]);
    }
    return localTallest;
}

const numberOfRocks = 2022;

// ####

// .#.
// ###
// .#.

// ..#
// ..#
// ###

// #
// #
// #
// #

// ##
// ##
const shapes = [
    [[2, 0], [3, 0], [4, 0], [5, 0]],
    [[2, 1], [3, 0], [3, 1], [3, 2], [4, 1]],
    [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[2, 0], [2, 1], [3, 0], [3, 1]]
];

let tallestHeight = 0;

// Put rocks on the ground
const rockCoords = new Set()
    .add('0,0')
    .add('1,0')
    .add('2,0')
    .add('3,0')
    .add('4,0')
    .add('5,0')
    .add('6,0');

let windCounter = { value: 0 }; // For pass by reference

for (let i = 0; i < numberOfRocks; i++) {
    let heightToStart = tallestHeight + 4;
    let shapeIndex = i % shapes.length;
    tallestHeight = dropRock(shapes[shapeIndex], heightToStart, rockCoords, windCounter, tallestHeight);
}

console.log(tallestHeight);
