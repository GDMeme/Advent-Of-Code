const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

function outOfBounds(x, y) {
    return x >= arr[0].length || x < 0 || y >= arr.length || y < 0;
}

function BFS(x, y, char) {
    let perimeter = 0;
    let frontier = [`${x},${y}`];
    let visited = new Set([`${x},${y}`]);
    while (frontier.length !== 0) {
        [x, y] = frontier.pop().split(",").map(e => parseInt(e));
        for (const direction of directionArray) {
            const [addX, addY] = direction;
            const currentX = x + addX;
            const currentY = y + addY;
            
            if (outOfBounds(currentX, currentY)) {
                perimeter++;
                continue;
            }
            
            if (visited.has(`${currentX},${currentY}`)) {
                continue;
            }
            
            // If it borders a non-char, it counts towards the perimeter
            if (arr[currentY][currentX] !== char) {
                perimeter++;
            } else {
                frontier.push(`${currentX},${currentY}`);
                visited.add(`${currentX},${currentY}`);
            }
        }
    }
    return [visited, perimeter];
}

let result = 0;
let totalVisited = new Set();

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (totalVisited.has(`${j},${i}`)) {
            continue;
        }
        
        const currentChar = arr[i][j];
        const [visited, perimeter] = BFS(j, i, currentChar);
        totalVisited = new Set([...totalVisited, ...visited]);
        result += visited.size * perimeter;
    }
}

console.log(result);