const { readFileSync } = require('fs');

const inputOutputMap = new Map();
readFileSync('./input.txt', 'utf-8').split(/\r?\n/).map(line => {
    const [input, outputs] = line.split(': ');
    inputOutputMap.set(input, outputs.split(' '));
});

const cache = new Map();

function countPaths(key) {
    if (cache.has(key)) {
        return cache.get(key);
    }

    if (key === 'out') {
        return 1;
    }

    let total = 0;
    for (const output of inputOutputMap.get(key)) {
        total += countPaths(output);
    }
    cache.set(key, total);
    return total;
}

let ans = 0;

for (const key of inputOutputMap.get('you')) {
    ans += countPaths(key);
}

console.log(ans);