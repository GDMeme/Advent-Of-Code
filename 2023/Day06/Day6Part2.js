const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let time = Number(arr[0].split("Time:        ")[1].split("     ").join("")); // Hardcoded don't care
let distance = Number(arr[1].split("Distance:   ")[1].split("   ").join(""));

let result = 0;
let found = false;

temp = 0;
for (let j = 0; j < time; j++) {
    if (j * (time - j) > distance) {
        result++;
        found = true;
    } else {
        if (found) { // to leave early
            break;
        }
    }
}

console.log(result);