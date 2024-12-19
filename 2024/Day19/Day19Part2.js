const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function checkIfPossible(towel) {
    let currentPossible = 0;
    const filtered = availableTowelsMap.get(towel[towel.length - 1]);
    
    if (filtered === undefined) {
        return 0;
    }
    for (const availableTowel of filtered) {
        if (availableTowel === towel) {
            currentPossible++;
            continue;
        }
        if (availableTowel === towel.slice(towel.length - availableTowel.length, towel.length)) {
            const newTowel = towel.slice(0, towel.length - availableTowel.length);
            if (!cache.has(newTowel)) {
                cache.set(newTowel, checkIfPossible(newTowel));
            }
            currentPossible += cache.get(newTowel);
        }
    }
    return currentPossible;
}

const availableTowels = arr[0].split(', ');

const availableTowelsMap = new Map();

for (const towel of availableTowels) {
    const value = availableTowelsMap.get(towel[towel.length - 1]);
    availableTowelsMap.set(towel[towel.length - 1], value === undefined ? [towel] : [...value, towel]);
}

let totalPossible = 0;
let cache = new Map();

for (let i = 2; i < arr.length; i++) {
    possible = 0;
    totalPossible += checkIfPossible(arr[i]);    
}

console.log(totalPossible);