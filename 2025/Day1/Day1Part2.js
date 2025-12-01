const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let ans = 0;
let currPosition = 50;
for (const instruction of arr) {
    const direction = instruction.slice(0, 1);
    const distance = parseInt(instruction.slice(1));
    
    if (direction === 'R') {
        currPosition += distance;
        ans += Math.floor(currPosition / 100);
        currPosition %= 100;
    } else { // L
        if (currPosition === 0) { // Edge case
            ans -= 1;
        }
        currPosition -= distance;
        ans += Math.floor(-currPosition / 100) + 1;
        currPosition %= 100;
        if (currPosition < 0) { // JS modulo can end as negative
            currPosition += 100;
        }
    }
}

console.log(ans);