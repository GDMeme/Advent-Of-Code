const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let numXMAS = 0;

const matrix = [[1, 1], [1, -1], [-1, -1], [-1, 1]];

function coordinateOutOfBounds(x, y) {
    return x < 0 || y < 0 || x >= arr[0].length || y >= arr.length;
}

function checkXMAS(x, y) {
    for (const [addX, addY] of matrix) {
        currentX = x + addX;
        currentY = y + addY;
        if (coordinateOutOfBounds(currentX, currentY)) {
            return;
        }
    }
    
    // Brute force
    if (arr[y - 1][x - 1] === "S") { // top left
        if (arr[y - 1][x + 1] === "S") { // top right
            if (arr[y + 1][x - 1] === "M" && arr[y + 1][x + 1] === "M") {
                numXMAS += 1;
            } 
        } else if (arr[y + 1][x - 1] === "S") { // bottom left
            if (arr[y - 1][x + 1] === "M" && arr[y + 1][x + 1] === "M") {
                numXMAS += 1;
            } 
        }
    } else if (arr[y - 1][x - 1] === "M") { // top left
        if (arr[y - 1][x + 1] === "M") { // top right
            if (arr[y + 1][x - 1] === "S" && arr[y + 1][x + 1] === "S") {
                numXMAS += 1;
            } 
        } else if (arr[y + 1][x - 1] === "M") { // bottom left
            if (arr[y - 1][x + 1] === "S" && arr[y + 1][x + 1] === "S") {
                numXMAS += 1;
            } 
        }
    }
}

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] == "A") {
            checkXMAS(j, i);
        }
    }
}

console.log(numXMAS)