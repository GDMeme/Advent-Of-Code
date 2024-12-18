const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function outOfBounds(x, y) {
    return x < 0 || x > 70 || y < 0 || y > 70;
}

function BFS(frontier, visited) {
    let numSteps = 0;
    while (frontier.length !== 0) {
        const numElements = frontier.length;
        for (let i = 0; i < numElements; i++) {
        
            const [x, y] = frontier.shift();
                
            for (const direction of directionArray) {
                const [addX, addY] = direction;
                
                const currentX = x + addX;
                const currentY = y + addY;
                
                if (outOfBounds(currentX, currentY)) {
                    continue;
                }
                
                if (currentX === 70 && currentY === 70) {
                    return numSteps + 1;
                }
                
                if (map[currentY][currentX] !== "#" && !visited.has(`${currentX},${currentY}`)) {            
                    visited.add(`${currentX},${currentY}`);
                    frontier.push([currentX, currentY]);
                }
            }
        }
        numSteps++;
    }    
}

let directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// Create a 71x71 map
let map = new Array(71);
for (let i = 0; i < map.length; i++) {
    map[i] = new Array(71);
    for (let j = 0; j < map[i].length; j++) {
        map[i][j] = ".";
    }
}

const numBytes = 1024;

for (let i = 0; i < numBytes; i++) {
    const [x, y] = arr[i].split(",").map(e => parseInt(e));
    map[y][x] = "#";
}

console.log(BFS([[0, 0]], new Set("0,0"))); 