const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const startPosition = arr[0].indexOf('S');
let currentBeams = new Set([startPosition]);

let ans = 0;
for (let i = 1; i < arr.length; i++) {
    const splitterIndices = [];
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '^') {
            splitterIndices.push(j);
        }
    }

    for (const splitterIndex of splitterIndices) {
        const newBeams = new Set();
        if (currentBeams.has(splitterIndex)) {
            currentBeams.delete(splitterIndex);
            ans++;
            newBeams.add(splitterIndex - 1);
            newBeams.add(splitterIndex + 1);
        }
        currentBeams = new Set([...currentBeams, ...newBeams]);
    }
}

console.log(ans);