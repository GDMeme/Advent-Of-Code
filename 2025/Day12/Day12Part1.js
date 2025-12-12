const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let currentLine = 0;
while (!arr[currentLine].includes('x')) {
    currentLine++;
};

let ans = 0;
for (let i = currentLine; i < arr.length; i++) {
    const [dimension, presents] = arr[i].split(': ');
    
    const numPresents = presents.split(' ').map(e => parseInt(e, 10)).reduce((a, b) => a + b, 0);
    const numTiles = dimension.split('x').map(e => parseInt(e, 10)).reduce((a, b) => a * b, 1);
    
    if (numPresents * 9 <= numTiles) { // Cheese
        ans++;
    }
}

console.log(ans);