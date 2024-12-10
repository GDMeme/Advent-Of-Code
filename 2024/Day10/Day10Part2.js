const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const reachableNines = new Set();

function outOfBounds(x, y) {
    return x >= arr[0].length || x < 0 || y >= arr.length || y < 0;
}

function BFS(x, y, currentHeight) {
    let returnValue = 0;
    for (const direction of directionArray) {
        const [addX, addY] = direction.map(e => parseInt(e));
        const currentX = x + addX;
        const currentY = y + addY;
        
        if (outOfBounds(currentX, currentY)) {
            continue;
        }
        
        if (parseInt(arr[currentY][currentX]) === currentHeight + 1) {
            if (currentHeight === 8) { // Found a 9
                returnValue += 1;
                continue;
            }
            
            returnValue += BFS(currentX, currentY, currentHeight + 1);
        }
    }
    return returnValue;
}

let result = 0;

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== '0') {
            continue;
        }
        
        const rating = BFS(j, i, parseInt(arr[i][j]));
        result += rating;
    }
}

console.log(result);