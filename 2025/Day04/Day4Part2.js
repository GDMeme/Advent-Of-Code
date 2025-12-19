const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const arr = syncReadFile('./input.txt');

const outOfBounds = (x, y) => {
    return x < 0 || x >= arr.length || y < 0 || y >= arr[0].length;
};

const directionArray = [[0, 1], [1,1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

let ans = 0;

let changed = true;
while (changed) {
    changed = false;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[i][j] !== "@") {
                continue;
            }
            let numAdjacentPaper = 0;
            for (const [dx, dy] of directionArray) {
                const newX = j + dx;
                const newY = i + dy;
                if (outOfBounds(newX, newY)) {
                    continue;
                }
                
                if (arr[newY][newX] === "@") {
                    numAdjacentPaper += 1;
                }
            }   
            if (numAdjacentPaper < 4) {
                ans++;
                arr[i] = arr[i].slice(0, j) + "." + arr[i].slice(j + 1);
                changed = true;
            }
        }    
    }
}

console.log(ans);