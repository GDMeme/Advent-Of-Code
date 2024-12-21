const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function invalidCoordinate(x, y, isNumericKeypad) {
    if (isNumericKeypad) {
        return x < 0 || x > 2 || y < 0 || y > 3 || (x === 0 && y === 3);
    } else {
        return x < 0 || x > 2 || y < 0 || y > 1 || (x === 0 && y === 0);
    }
}

// Returns all minimal paths to get from start to end
function findAllMinPaths(startX, startY, endX, endY, isNumericKeypad) {
    let frontier = [[startX, startY, ""]];
    const visited = new Set();
    let totalPaths = [];
    let minLength = Infinity;
    while (frontier.length !== 0) {
        const [currentX, currentY, path] = frontier.shift();
        for (const [addX, addY] of directionArray) {
            const newX = currentX + addX;
            const newY = currentY + addY;
            
            if (invalidCoordinate(newX, newY, isNumericKeypad) || visited.has(`${newX},${newY}`)) {
                continue;
            }
            
            // No need to optimize, completes almost instantly anyways
            
            const newPath = path + directionArrayMap.get(`${addX},${addY}`);
            
            if (newX === endX && newY === endY) {
                if (path.length < minLength) {
                    totalPaths = [];
                    minLength = path.length;
                }
                if (path.length === minLength) {
                    totalPaths.push(newPath + "A");
                }
                continue;
            }
            
            // Otherwise add to frontier
            frontier.push([newX, newY, newPath]);
        }
        visited.add(`${currentX},${currentY}`);
    }
    if (totalPaths.length === 0) {
        return ["A"];
    }
    return totalPaths;
}

const directionArrayMap = new Map();
// Up and down are reversed since negative is up
directionArrayMap.set('0,1', "v");
directionArrayMap.set('1,0', ">");
directionArrayMap.set('0,-1', "^");
directionArrayMap.set('-1,0', "<");

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const numericKeypadMap = new Map();
numericKeypadMap.set("A", [2, 3]);
numericKeypadMap.set(0, [1, 3]);
numericKeypadMap.set(1, [0, 2]);
numericKeypadMap.set(2, [1, 2]);
numericKeypadMap.set(3, [2, 2]);
numericKeypadMap.set(4, [0, 1]);
numericKeypadMap.set(5, [1, 1]);
numericKeypadMap.set(6, [2, 1]);
numericKeypadMap.set(7, [0, 0]);
numericKeypadMap.set(8, [1, 0]);
numericKeypadMap.set(9, [2, 0]);

const directionalKeypadMap = new Map();
directionalKeypadMap.set("A", [2, 0]);
directionalKeypadMap.set("<", [0, 1]);
directionalKeypadMap.set("v", [1, 1]);
directionalKeypadMap.set(">", [2, 1]);
directionalKeypadMap.set("^", [1, 0]);

let result = 0;

let memo = new Map();

function solve(isNumericKeypad, code, depth) {
    let key = code + "_" + depth;
    if (memo.get(key) !== undefined) {
        return memo.get(key);
    }
    
    [startPosX, startPosY] = isNumericKeypad ? [2, 3] : [2, 0];
    let length = 0;
    
    for (let symbol of code) {
        if (!isNaN(symbol)) {
            symbol = parseInt(symbol);
        }
        
        const [endPosX, endPosY] = isNumericKeypad ? numericKeypadMap.get(symbol) : directionalKeypadMap.get(symbol);
        
        // This is fine because a non-minimal path will never be the most efficient (trivially)
        let allMinPaths = findAllMinPaths(startPosX, startPosY, endPosX, endPosY, isNumericKeypad)
        if (depth === 0) {
            length += allMinPaths[0].length;
        } else {
            length += Math.min(...allMinPaths.map(path => solve(false, path, depth - 1)))
        }
        
        startPosX = endPosX;
        startPosY = endPosY;
    }
    
    memo.set(key, length);
    return length;
}

const numRobots = 25;

for (const code of arr) {
    const numericPart = parseInt(code.slice(0, -1));
    result += numericPart * solve(true, code, numRobots);    
}

console.log(result);