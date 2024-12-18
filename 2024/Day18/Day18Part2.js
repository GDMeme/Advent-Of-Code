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
                    visited.add(`${currentX},${currentY}`);
                    return visited;
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

let currentLastByte = 1024;

for (let i = 0; i < currentLastByte; i++) {
    const [x, y] = arr[i].split(",").map(e => parseInt(e));
    map[y][x] = "#";
}

while (true) {
    // Find path to exit
    visited = BFS([[0, 0]], new Set("0,0")); 
    
    // Check if couldn't find path to exit
    if (visited === undefined) {
        break;
    }
    
    // Find first byte that blocks path
    currentLastByte--; // Fix off by 1
    while (true) {
        currentLastByte++;
        const [x, y] = arr[currentLastByte].split(",").map(e => parseInt(e));
        map[y][x] = "#";
        
        // Check if current path became blocked
        if (visited.has(arr[currentLastByte])) {
            break;
        }
    }
}

console.log(arr[currentLastByte]);