const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let startingPosition;
let found = false;
for (let i = 0; i < arr.length && !found; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 'S') {
            startingPosition = [j, i];
            found = true;
            break;
        }
    }
}

function outOfBounds(x, y) {
	return x < 0 || y < 0 || y >= arr.length || x >= arr[0].length;
}

// Assume that starting position can only be one possible pipe
// Find what pipe it is
const northPipes = new Map()
    .set('|', 'south')
    .set('L', 'east') 
    .set('J', 'west');

const southPipes = new Map()
    .set('|', 'north')
    .set('7', 'west')
    .set('F', 'east');
    
const westPipes = new Map()
    .set('-', 'east')
    .set('J', 'north')
    .set('7', 'south');
    
const eastPipes = new Map()
    .set('-', 'west')
    .set('L', 'north')
    .set('F', 'south');
    
const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const directionToCardinal = new Map()
    .set('0,1', 'south') // Think like array indices
    .set('1,0', 'east')
    .set('0,-1', 'north')
    .set('-1,0', 'west');
    
const cardinalToDirection = new Map()
    .set('north', [0, -1])
    .set('east', [1, 0])
    .set('south', [0, 1])
    .set('west', [-1, 0]);
    
const reverseCardinal = new Map()
    .set('north', 'south')
    .set('south', 'north')
    .set('west', 'east')
    .set('east', 'west');
    
const cardinalToMap = new Map()
    .set('north', northPipes)
    .set('south', southPipes)
    .set('west', westPipes)
    .set('east', eastPipes);
    
const possibleDirections = [];
for (let i = 0; i < directionArray.length; i++) {
    const [newX, newY] = [startingPosition[0] + directionArray[i][0], startingPosition[1] + directionArray[i][1]];
    if (outOfBounds(newX, newY)) {
        continue;   
    }
    
    const directionCameFrom = reverseCardinal.get(directionToCardinal.get(directionArray[i].join(',')));
    if (cardinalToMap.get(directionCameFrom).has(arr[newY][newX])) {
        possibleDirections.push([newX, newY, reverseCardinal.get(directionCameFrom)]);
    }
}

let currCoordsAndDirection = possibleDirections[0];
const visited = new Set();
while (true) {
    visited.add(currCoordsAndDirection.slice(0, 2).join(','));
    const [currX, currY, cameFrom] = currCoordsAndDirection;
    const pipeMap = cardinalToMap.get(reverseCardinal.get(cameFrom));
    const pipeType = arr[currY][currX];
    if (pipeType === 'S') {
        break;
    }
    const nextDirection = pipeMap.get(pipeType);
    const directionDelta = cardinalToDirection.get(nextDirection);
    const nextX = currX + directionDelta[0];
    const nextY = currY + directionDelta[1];
    currCoordsAndDirection = [nextX, nextY, nextDirection];
}

console.log(visited.size / 2);