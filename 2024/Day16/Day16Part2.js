const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]]; // North East South West

// Find S and E
let startCoords, endCoords;

for (let i = 0; i < arr.length; i++) {
    const possibleSIndex = arr[i].indexOf("S");
    const possibleEIndex = arr[i].indexOf("E");
    
    if (possibleSIndex !== -1) {
        startCoords = `${possibleSIndex},${i}`;
    }
    
    if (possibleEIndex !== -1) {
        endCoords = `${possibleEIndex},${i}`;
    }
    
    if (startCoords && endCoords) {
        break;
    }
}
// Direction 1 is index 1 of directionArray (East)
let frontier = [{coords: startCoords, currentScore: 0, direction: 1, visited: new Set(startCoords)}]; 
let minScore = Number.MAX_SAFE_INTEGER;

const currentLowest = new Array(arr.length);
for (let i = 0; i < arr.length; i++) {
    currentLowest[i] = new Array(arr[0].length);
    for (let j = 0; j < arr[0].length; j++) {
        currentLowest[i][j] = new Array(4); // 1 for each direction, North, East, South, West
    } 
}

let partOfBestPath = new Set();

while (frontier.length !== 0) {
    ({coords, currentScore, direction, visited} = frontier.pop()); // JS destructuring assignment
    
    const [x, y] = coords.split(",").map(e => parseInt(e));
    
    for (let i = 0; i < directionArray.length; i++) {
        // Don't go backwards
        if (Math.abs(i - direction) === 2) {
            continue;
        }
        
        const [addX, addY] = directionArray[i];
        const newX = x + addX;
        const newY = y + addY;
        
        const newScore = currentScore + 1000 * (Math.abs(i - direction) === 3 ? 1 : Math.abs(i - direction)) + 1;
        
        // Check if there was already a cheaper cost to get to the next coordinate
        if (currentLowest[newY][newX][i] === undefined || newScore <= currentLowest[newY][newX][i]) {
            currentLowest[newY][newX][i] = newScore;
        } else {
            continue;
        }
        
        if (newScore > minScore) {
            continue;
        }
        
        if (arr[newY][newX] === "." && !visited.has(`${newX},${newY}`)) {
            const newVisited = new Set(visited);
            newVisited.add(`${newX},${newY}`);
            frontier.push({coords: `${newX},${newY}`, currentScore: newScore, direction: i, visited: newVisited});
        } else if (arr[newY][newX] === "E") { 
            if (newScore < minScore) {
                minScore = newScore;
                partOfBestPath = new Set(visited);
            }
            
            if (newScore === minScore) {
                partOfBestPath = new Set([...partOfBestPath, ...visited]);
            }
        }
    }
}

// + 1 because of End coordinate
console.log(partOfBestPath.size + 1);