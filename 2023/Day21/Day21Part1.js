const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function outOfBounds(x, y) {
    return y < 0 || y >= arr.length || x < 0 || x >= arr[0].length;
}

let startX;
let startY;

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === 'S') {
            startX = j;
            startY = i;
        }
    }
}

const STEPS = 64;

const directionArray = [[1, 0], [0, 1], [-1, 0], [0, -1]];
const visited = new Map();
visited.set(`${startX},${startY}`, 0);
const frontier = [];
frontier.push({x: startX, y: startY, depth: 0});
while (true) {
    const { x, y, depth } = frontier.shift();
    
    if (depth === STEPS + 1) {
        break;
    }
    
    for (const [dx, dy] of directionArray) {
        const newX = x + dx;
        const newY = y + dy;
        
        if (visited.has(`${newX},${newY}`) || arr[newY][newX] === '#' || outOfBounds(newX, newY)) {
            continue;
        }
        
        frontier.push({ x: newX, y: newY, depth: depth + 1 });
        visited.set(`${newX},${newY}`, depth + 1);
    }
}

console.log(Array.from(visited)
    .reduce((acc, curr) => {
        if (curr[1] % 2 === 0) {
            return acc + 1;    
        } else {
            return acc;
        }
    }, 0)
)