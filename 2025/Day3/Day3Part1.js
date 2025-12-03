const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let ans = 0;
for (const line of arr) {
    let currentMax = 0;
    let previousMax = 0;
    let nextMax = 0;
    for (let i = 0; i < line.length; i++) {
        const digit = parseInt(line[i]);
        if (digit > currentMax) {
            previousMax = currentMax;
            currentMax = digit;
            if (i === line.length - 1) {
                ans += previousMax * 10 + currentMax;
                break;
            }
            nextMax = 0;
        } else if (digit > nextMax) {
            nextMax = digit;
        }
        
        if (i === line.length - 1) {
            ans += currentMax * 10 + nextMax;
        }
    }
}
console.log(ans);