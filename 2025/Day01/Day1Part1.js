const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const arr = syncReadFile('./input.txt');

let ans = 0;
let currPosition = 50;
for (const instruction of arr) {
    const direction = instruction.slice(0, 1);
    const distance = parseInt(instruction.slice(1));
    
    if (direction === 'R') {
        currPosition += distance;
        currPosition %= 100;
    } else { // L
        currPosition -= distance;
        currPosition %= 100;
        if (currPosition < 0) {
            currPosition += 100;
        }
    }
    
    if (currPosition === 0) {
        ans += 1;
    }
}

console.log(ans);