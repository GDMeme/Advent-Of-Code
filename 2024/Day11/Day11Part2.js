const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const stones = arr[0].split(" ").map(e => parseInt(e));

let stoneMap = new Map();

for (const stone of stones) {
    stoneMap.set(stone, stoneMap.has(stone) ? stoneMap.get(stone) + 1 : 1);
}

const numBlinks = 75;

for (let i = 0; i < numBlinks; i++) {
    const updatedMap = new Map();
    for (const [stone, numStones] of stoneMap) {
        if (stone === 0) {
            updatedMap.set(1, updatedMap.has(1) ? updatedMap.get(1) + numStones : numStones);
        } else {
            stoneString = stone.toString();
            if (stoneString.length % 2 === 0) {
                const leftStoneNumber = parseInt(stoneString.slice(0, stoneString.length / 2));
                updatedMap.set(leftStoneNumber, updatedMap.has(leftStoneNumber) ? updatedMap.get(leftStoneNumber) + numStones : numStones);
                const rightStoneNumber = parseInt(stoneString.slice(stoneString.length / 2, stoneString.length));
                updatedMap.set(rightStoneNumber, updatedMap.has(rightStoneNumber) ? updatedMap.get(rightStoneNumber) + numStones : numStones);
            } else {
                const newStoneNumber = stone * 2024;
                updatedMap.set(newStoneNumber, updatedMap.has(newStoneNumber) ? updatedMap.get(newStoneNumber) + numStones : numStones);
            }
        }
    }
    stoneMap = updatedMap;
}

let result = 0;
for (const [_, numStones] of stoneMap) {
    result += numStones;
}

console.log(result);