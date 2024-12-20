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

const maxDistance = 20;
const twentyDirectionArray = [];

// Iterate through all possible distances
for (let d = 1; d <= maxDistance; d++) {
    // Iterate through all possible x offsets for the current distance
    for (let x = -d; x <= d; x++) {
        const y = d - Math.abs(x); // y must satisfy |x| + |y| = d
        if (Math.abs(x) + Math.abs(y) < 2) {
            continue;
        }
        if (y !== 0) {
            twentyDirectionArray.push([x, y], [x, -y]); // Add both positive and negative y
        } else {
            twentyDirectionArray.push([x, 0]); // Special case where y = 0
        }
    }
}

const saveMap = new Map();

const cheatingDuration = 20;
const minRequirement = 100;

for (const pathCoordinate of pathCoordinates) {
    const [currentX, currentY] = pathCoordinate;
    const currentPathCounter = arr[currentY][currentX];
    for (const [addX, addY] of twentyDirectionArray) {
        const newX = currentX + addX;
        const newY = currentY + addY;
        
        if (outOfBounds(newX, newY)) {
            continue;
        }
        
        if (arr[newY][newX] !== "#" && arr[newY][newX] > currentPathCounter) {
            const difference = arr[newY][newX] - currentPathCounter;
            const manhattanDistance =  Math.abs(newY - currentY) + Math.abs(newX - currentX); // For filtering
            const maxPossibleTimeSave = difference - manhattanDistance;
            if (maxPossibleTimeSave >= minRequirement && manhattanDistance <= cheatingDuration) {
                saveMap.set(maxPossibleTimeSave, (saveMap.get(maxPossibleTimeSave) || 0) + 1);
            }
        }
    }
}

const sum = Array.from(saveMap).reduce((acc, [, value]) => acc + value, 0);

console.log(sum);