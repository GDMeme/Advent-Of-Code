const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let times = arr[0].split("Time:        ")[1].split("     ").map(e => Number(e)); // Hardcoded don't care
let distance = arr[1].split("Distance:   ")[1].split("   ").map(e => Number(e));

let result = 1;
let temp;

for (let i = 0; i < times.length; i++) {
    temp = 0;
    for (let j = 0; j < times[i]; j++) {
        if (j * (times[i] - j) > distance[i]) {
            temp++;
        }
    }
    result *= temp;
}

console.log(result);