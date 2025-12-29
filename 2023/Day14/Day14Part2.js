const { readFileSync } = require('fs');

let arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function rollNorth(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'O') {
                // Remove the O
                arr[i] = arr[i].substring(0, j) + '.' + arr[i].substring(j + 1);
                let currY = i - 1;
                // Find the new place for the O
                while (currY >= 0 && arr[currY][j] !== '#' && arr[currY][j] !== 'O') {
                    currY--;
                }
                // Place the O
                arr[currY + 1] = arr[currY + 1].substring(0, j) + 'O' + arr[currY + 1].substring(j + 1);
            }
        }
    }
    return arr;
}

function rollWest(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'O') {
                // Remove the O
                arr[i] = arr[i].substring(0, j) + '.' + arr[i].substring(j + 1);
                let currX = j - 1;
                // Find the new place for the O
                while (currX >= 0 && arr[i][currX] !== '#' && arr[i][currX] !== 'O') {
                    currX--;
                }
                // Place the O
                arr[i] = arr[i].substring(0, currX + 1) + 'O' + arr[i].substring(currX + 2);
            }
        }
    }
    return arr;
}

function rollSouth(arr) {
    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] === 'O') {
                // Remove the O
                arr[i] = arr[i].substring(0, j) + '.' + arr[i].substring(j + 1);
                let currY = i + 1;
                // Find the new place for the O
                while (currY < arr.length && arr[currY][j] !== '#' && arr[currY][j] !== 'O') {
                    currY++;
                }
                // Place the O
                arr[currY - 1] = arr[currY - 1].substring(0, j) + 'O' + arr[currY - 1].substring(j + 1);
            }
        }
    }
    return arr;
}

function rollEast(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = arr[i].length - 1; j >= 0; j--) {
            if (arr[i][j] === 'O') {
                // Remove the O
                arr[i] = arr[i].substring(0, j) + '.' + arr[i].substring(j + 1);
                let currX = j + 1;
                // Find the new place for the O
                while (currX < arr[i].length && arr[i][currX] !== '#' && arr[i][currX] !== 'O') {
                    currX++;
                }
                // Place the O
                arr[i] = arr[i].substring(0, currX - 1) + 'O' + arr[i].substring(currX);
            }
        }
    }
    return arr;
}

const cache = new Map();
for (let i = 0; i < 1000000000; i++) {
    const key = arr.join('\n');
    if (cache.has(key)) {
        const cycleLength = i - cache.get(key);
        const remaining = 1000000000 - i;
        const cyclesToSkip = Math.floor(remaining / cycleLength);
        i += cyclesToSkip * cycleLength;
    } else {
        cache.set(key, i);
    }
    arr = rollNorth(arr);
    arr = rollWest(arr);
    arr = rollSouth(arr);
    arr = rollEast(arr);
}

// Calculate final answer
let ans = 0;
for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (arr[i][j] === 'O') {
            ans += arr.length - i;
        }
    }
}

console.log(ans);