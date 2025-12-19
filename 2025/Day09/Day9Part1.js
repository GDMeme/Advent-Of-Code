const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

// Just brute force all combinations
let currMaxArea = 0;
for (let i = 0; i < arr.length; i++) {
    const [oldX, oldY] = arr[i].split(',').map(Number);
    for (let j = i + 1; j < arr.length; j++) {
        const [newX, newY] = arr[j].split(',').map(Number);
        const area = (Math.abs(oldX - newX) + 1) * (Math.abs(oldY - newY) + 1); // Since the area includes itself
        if (area > currMaxArea) {
            currMaxArea = area;
        }
    }
}

console.log(currMaxArea);