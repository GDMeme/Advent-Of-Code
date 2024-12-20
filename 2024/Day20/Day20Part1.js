const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt')

function outOfBounds(x, y) {
    return x < 0 || x >= arr[0].length || y < 0 || y >= arr.length;
}

let startCoords;

// Find start and end coordinates
for (let i = 0; i < arr.length; i++) {
    if (startCoords) {
        break;
    }
    
    const possibleStartX = arr[i].indexOf("S");
    
    if (possibleStartX !== -1) {
        startCoords = [possibleStartX, i];
    }
}

// Don't want to manipulate strings
arr = arr.map(e => e.split(""));


const singleDirectionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

let [currentX, currentY] = startCoords;
let nextX, nextY, pathCounter = 1;

let finished = false;

let pathCoordinates = new Set([startCoords]);

// Set baseline values for each . in path
arr[currentY][currentX] = 0;
while (!finished) {
    for (const [addX, addY] of singleDirectionArray) {
        
        const newX = currentX + addX;
        const newY = currentY + addY;
        
        if (outOfBounds(newX, newY)) {
            continue;
        }
        
        // Will only have 1 path becasue replacing as going along
        if (arr[newY][newX] === ".") {
            nextX = newX;
            nextY = newY;
            arr[newY][newX] = pathCounter;
            pathCoordinates.add([newX, newY]);
        }
        
        if (arr[newY][newX] === "E") {
            arr[newY][newX] = pathCounter;
            pathCoordinates.add([newX, newY]);
            finished = true;
            break;
        }
    }
    
    currentX = nextX;
    currentY = nextY;
    pathCounter++;
}

const doubleDirectionArray = [[0, 2], [1, 1], [2, 0], [1, -1], [0, -2], [-1, -1], [-2, 0], [-1, 1]];

const saveMap = new Map();

for (const pathCoordinate of pathCoordinates) {
    const [currentX, currentY] = pathCoordinate;
    const currentPathCounter = arr[currentY][currentX];
    for (const [addX, addY] of doubleDirectionArray) {
        const newX = currentX + addX;
        const newY = currentY + addY;
        
        if (outOfBounds(newX, newY)) {
            continue;
        }
        
        if (arr[newY][newX] !== "#" && arr[newY][newX] > currentPathCounter) {
            const timeSave = arr[newY][newX] - currentPathCounter - 2;
            if (timeSave > 0) {
                saveMap.set(timeSave, (saveMap.get(timeSave) || 0) + 1);
            }
        }
    }
}

const sum = Array.from(saveMap).reduce((acc, [key, value]) => {
    if (key >= 100) {
      acc += value;
    }
    return acc;
}, 0);

console.log(sum);