const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function outOfBounds(x, y) {
    return y < 0 || y >= arr.length || x < 0 || x >= arr[0].length;
}

const startCol = arr[0].indexOf('.');
const endX = arr[arr.length - 1].indexOf('.');
const endY = arr.length - 1;
const endCoords = `${endX},${endY}`;

const slopeToDirection = new Map()
    .set('^', [[0, -1]])
    .set('v', [[0, 1]])
    .set('<', [[-1, 0]])
    .set('>', [[1, 0]]);

const directionArray = [[0, -1], [1, 0], [0, 1], [-1, 0]];
    
function findPaths(x, y, visited, length) {
    const newPaths = [];
    
    const directions = slopeToDirection.has(arr[y][x]) ? slopeToDirection.get(arr[y][x]) : directionArray;
    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (`${newX},${newY}` === endCoords) {
            return length + 1;
        }
        
        const key = `${newX},${newY}`;
        if (outOfBounds(newX, newY) || arr[newY][newX] === '#' || visited.has(key)) {
            continue;
        }
        
        newPaths.push(findPaths(newX, newY, new Set(visited).add(key), length + 1));
    }
    
    return Math.max(...newPaths);
}

console.log(findPaths(startCol, 0, new Set([`${startCol},0`]), 0));