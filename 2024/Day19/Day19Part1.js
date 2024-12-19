const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function checkIfPossible(towel) {
    const filtered = availableTowelsMap.get(towel[towel.length - 1]);
    
    if (filtered === undefined) {
        return;
    }
    for (const availableTowel of filtered) {
        if (possible) {
            return;
        }
        if (availableTowel === towel) {
            possible = true;
            return;
        }
        if (availableTowel === towel.slice(towel.length - availableTowel.length, towel.length)) {
            checkIfPossible(towel.slice(0, towel.length - availableTowel.length));
        }
    }
}

const availableTowels = arr[0].split(', ');

const availableTowelsMap = new Map();

for (const towel of availableTowels) {
    const value = availableTowelsMap.get(towel[towel.length - 1]);
    availableTowelsMap.set(towel[towel.length - 1], value === undefined ? [towel] : [...value, towel]);
}

let possible;
let totalPossible = 0;

for (let i = 2; i < arr.length; i++) {
    possible = false;
    checkIfPossible(arr[i]);
    
    if (possible) {
        totalPossible++;
    }
}

console.log(totalPossible);