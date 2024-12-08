const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const symbolToCoordinates = new Map();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== ".") {
            symbolToCoordinates.set(arr[i][j], symbolToCoordinates.get(arr[i][j]) === undefined ? [`${j},${i}`] : [...symbolToCoordinates.get(arr[i][j]), `${j},${i}`]);
        }
    }
}

const antinodeCoordinates = new Set();

function outOfBounds(x, y) {
    return (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length);
}

for (const [_, coordinates] of symbolToCoordinates) {
    // Loop through all combinations of coordinates
    for (let i = 0; i < coordinates.length; i++) {
        const [firstX, firstY] = coordinates[i].split(",").map(e => parseInt(e));
        for (let j = i + 1; j < coordinates.length; j++) {
            const [secondX, secondY] = coordinates[j].split(",").map(e => parseInt(e));
            const xDifference = secondX - firstX;
            const yDifference = secondY - firstY;
            
            let currentX = secondX;
            let currentY = secondY;
            while (!outOfBounds(currentX, currentY)) {
                antinodeCoordinates.add(`${currentX},${currentY}`);
                currentX -= xDifference;
                currentY -= yDifference;
            }
            currentX = secondX;
            currentY = secondY;
            while (!outOfBounds(currentX, currentY)) {
                antinodeCoordinates.add(`${currentX},${currentY}`);
                currentX += xDifference;
                currentY += yDifference;
            }
        }
    }
}

console.log(antinodeCoordinates.size);