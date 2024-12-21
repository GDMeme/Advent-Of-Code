const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// Extremely slow solution, brute forced every combination

function invalidCoordinate(x, y, numericKeypad) {
    if (numericKeypad) {
        return x < 0 || x > 2 || y < 0 || y > 3 || (x === 0 && y === 3);
    } else {
        return x < 0 || x > 2 || y < 0 || y > 1 || (x === 0 && y === 0);
    }
}

// Returns every combination of inputs to get to the end from the start
function calculateCombinations(startX, startY, endX, endY, numericKeypad) {
    let frontier = [[startX, startY, ""]];
    let visited = new Set();
    let totalPaths = [];
    while (frontier.length !== 0) {
        const [currentX, currentY, path] = frontier.shift();
        for (const [addX, addY] of directionArray) {
            const newX = currentX + addX;
            const newY = currentY + addY;
            
            if (invalidCoordinate(newX, newY, numericKeypad) || visited.has(`${newX},${newY}`)) {
                continue;
            }
            
            const newPath = path + directionArrayMap.get(`${addX},${addY}`);
            
            if (newX === endX && newY === endY) {
                totalPaths.push(newPath + "A");
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

for (const code of arr) {
    let firstRobotStart = [2, 3];
    let secondRobotStart = [2, 0];
    let humanStart = [2, 0];
    
    let firstChar = true;
    let firstRobotSequences = [];
    let [firstRobotCurrentX, firstRobotCurrentY] = firstRobotStart;
    for (let number of code) {
        if (!isNaN(number)) {
            number = parseInt(number);
        }
        
        // First robot
        const [firstRobotDestinationX, firstRobotDestinationY] = numericKeypadMap.get(number);
        
        const inputToAdd = calculateCombinations(firstRobotCurrentX, firstRobotCurrentY, firstRobotDestinationX, firstRobotDestinationY, 1);
        
        if (firstChar) {
            inputToAdd.forEach(e => firstRobotSequences.push(e));
        } else {
            firstRobotSequences = firstRobotSequences.flatMap(e => inputToAdd.map(e2 => e + e2));
        }
        firstChar = false;
        
        // Update first robot coordinates
        firstRobotCurrentX = firstRobotDestinationX;
        firstRobotCurrentY = firstRobotDestinationY;
    }
        
    // Second robot
    let totalSecondRobotSequences = [];
    for (const sequence of firstRobotSequences) {
        firstChar = true;
        let [secondRobotCurrentX, secondRobotCurrentY] = secondRobotStart;
        let currentSecondRobotSequences = [];
        for (const symbol of sequence) {
            const [secondRobotDestinationX, secondRobotDestinationY] = directionalKeypadMap.get(symbol);
            const inputToAdd = calculateCombinations(secondRobotCurrentX, secondRobotCurrentY, secondRobotDestinationX, secondRobotDestinationY, 0);
            
            if (firstChar) {
                inputToAdd.forEach(e => currentSecondRobotSequences.push(e));
            } else {
                currentSecondRobotSequences = currentSecondRobotSequences.flatMap(e => inputToAdd.map(e2 => e + e2));
            }
            firstChar = false;
            
            // Update second robot coordinates
            secondRobotCurrentX = secondRobotDestinationX;
            secondRobotCurrentY = secondRobotDestinationY;
        }
        totalSecondRobotSequences = [...totalSecondRobotSequences, ...currentSecondRobotSequences];
    }
        
    // Human
    let totalHumanSequences = [];
    for (const sequence of totalSecondRobotSequences) {
        firstChar = true;
        let [humanCurrentX, humanCurrentY] = humanStart;
        let currentHumanSequences = [];
        for (const symbol of sequence) {
            const [humanDestinationX, humanDestinationY] = directionalKeypadMap.get(symbol);
            const inputToAdd = calculateCombinations(humanCurrentX, humanCurrentY, humanDestinationX, humanDestinationY, 0);
            
            if (firstChar) {
                inputToAdd.forEach(e => currentHumanSequences.push(e));
            } else {
                currentHumanSequences = currentHumanSequences.flatMap(e => inputToAdd.map(e2 => e + e2));
            }
            firstChar = false;
            
            // Update second robot coordinates
            humanCurrentX = humanDestinationX;
            humanCurrentY = humanDestinationY;
        }
        totalHumanSequences = [...totalHumanSequences, ...currentHumanSequences];
    }
                
    const smallestLength = totalHumanSequences.reduce((min, str) => {
        return Math.min(min, str.length);
    }, Infinity);
    
    const numericPart = parseInt(code.slice(0, -1));
    
    result += numericPart * smallestLength;    
}

console.log(result);