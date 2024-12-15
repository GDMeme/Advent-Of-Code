const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let currentIndex = 0;

const width = arr[0].length;

let subX;
let subY;

// Find the sub and the end of grid
while (arr[currentIndex] !== "") {
    const possibleSubX = arr[currentIndex].indexOf("@");
    if (possibleSubX !== -1) {
        subX = possibleSubX;
        subY = currentIndex;
        // Replace the sub spot with a .
        arr[currentIndex] = arr[currentIndex].slice(0, subX) + "." + arr[currentIndex].slice(subX + 1, width)
    }
    currentIndex++;
}

currentIndex++;

let moves = "";
while (currentIndex < arr.length) {
    moves += arr[currentIndex];
    currentIndex++;
}

for (const move of moves) {
    if (move === "^") {
        let checkY = subY - 1;
        let doMove = false;
        while (arr[checkY][subX] !== "#") {
            if (arr[checkY][subX] === ".") {
                doMove = true;
                break;
            }
            checkY -= 1;
        }
        
        if (doMove) {
            // Check if need to move a box
            if (arr[subY - 1][subX] === "O") {
                arr[subY - 1] = arr[subY - 1].slice(0, subX) + "." + arr[subY - 1].slice(subX + 1, width)
                arr[checkY] = arr[checkY].slice(0, subX) + "O" + arr[checkY].slice(subX + 1, width)
            }
            subY--;
        }
    } else if (move === ">") {
        let checkX = subX + 1;
        let doMove = false;
        while (arr[subY][checkX] !== "#") {
            if (arr[subY][checkX] === ".") {
                doMove = true;
                break;
            }
            checkX += 1;
        }
        
        if (doMove) {
            // Check if need to move a box
            if (arr[subY][subX + 1] === "O") {
                arr[subY] = arr[subY].slice(0, subX + 1) + "." + arr[subY].slice(subX + 2, checkX) + "O" + arr[subY].slice(checkX + 1, width);
            }
            subX++;
        }
    } else if (move === "v") {
        let checkY = subY + 1;
        let doMove = false;
        while (arr[checkY][subX] !== "#") {
            if (arr[checkY][subX] === ".") {
                doMove = true;
                break;
            }
            checkY += 1;
        }
        
        if (doMove) {
            // Check if need to move a box
            if (arr[subY + 1][subX] === "O") {
                arr[subY + 1] = arr[subY + 1].slice(0, subX) + "." + arr[subY + 1].slice(subX + 1, width)
                arr[checkY] = arr[checkY].slice(0, subX) + "O" + arr[checkY].slice(subX + 1, width)
            }
            subY++;
        }
    } else if (move === "<") {
        let checkX = subX - 1;
        let doMove = false;
        while (arr[subY][checkX] !== "#") {
            if (arr[subY][checkX] === ".") {
                doMove = true;
                break;
            }
            checkX -= 1;
        }
        
        if (doMove) {
            // Check if need to move a box
            if (arr[subY][subX - 1] === "O") {
                arr[subY] = arr[subY].slice(0, checkX) + "O" + arr[subY].slice(checkX + 1, subX - 1) + "." + arr[subY].slice(subX, width);
            }
            subX--;
        }
    }
}

let result = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
        break;
    }
    
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "O") {
            result += 100 * i + j;
        }
    }
}

console.log(result);