const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let numXMAS = 0;

const matrix = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

function coordinateOutOfBounds(x, y) {
    return x < 0 || y < 0 || x >= arr[0].length || y >= arr.length;
}

function checkXMAS(x, y, addX, addY, target) {
    const currentX = x + addX;
    const currentY = y + addY;
    if (coordinateOutOfBounds(currentX, currentY)) {
        return;
    }
    if (arr[currentY][currentX] === target) {
        if (target === "S") {
            numXMAS += 1;
            return;
        }
        checkXMAS(currentX, currentY, addX, addY, target === "M" ? "A" : "S");
    }
}

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == "X") {
            for (const [addX, addY] of matrix) {
                checkXMAS(j, i, addX, addY, "M");
            }
        }
    }
}

console.log(numXMAS)