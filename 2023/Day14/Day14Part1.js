const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let ans = 0;
// Roll all rocks north
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
            ans += arr.length - (currY + 1);
        }
    }
}

console.log(ans);