const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const stones = arr[0].split(" ").map(e => parseInt(e));

const numBlinks = 25;

for (let i = 0; i < numBlinks; i++) {
    const numStones = stones.length;
    for (let j = 0; j < numStones; j++) {
        if (stones[j] === 0) {
            stones[j] = 1;
        } else {
            stoneString = stones[j].toString();
            if (stoneString.length % 2 === 0) {
                stones.push(parseInt(stoneString.slice(0, stoneString.length / 2)));
                stones[j] = parseInt(stoneString.slice(stoneString.length / 2, stoneString.length));
            } else {
                stones[j] *= 2024;
            }
        }
    }
}

console.log(stones.length);