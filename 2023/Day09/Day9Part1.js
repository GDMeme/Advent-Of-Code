const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let ans = 0;
for (let i = 0; i < arr.length; i++) {
    let currNums = arr[i].split(' ').map(Number);
    let currentSum = 0;
    while (!currNums.every(num => num === 0)) {
        currentSum += currNums[currNums.length - 1];
        const newNums = [];
        for (let j = 0; j < currNums.length - 1; j++) {
            newNums.push(currNums[j + 1] - currNums[j]);
        }
        currNums = newNums;
    }
    ans += currentSum;
}

console.log(ans);