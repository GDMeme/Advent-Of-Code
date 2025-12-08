const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const groupsOfNumbers = [];

let ans = 0;
let operator;
for (let i = 0; i < arr[0].length; i++) {
    let nextGroupFlag = true;
    let currentNumber = '';
    for (let j = 0; j < arr.length; j++) {
        if (arr[j][i] !== ' ') {
            nextGroupFlag = false;
            if (arr[j][i] === '*' || arr[j][i] === '+') {
                operator = arr[j][i];
            } else {
                currentNumber += arr[j][i];
            }
        }
    }
    if (!nextGroupFlag) {
        groupsOfNumbers.push(parseInt(currentNumber));
    } else {
        if (operator === '*') {
            ans += groupsOfNumbers.reduce((acc, val) => acc * val, 1);
        } else if (operator === '+') {
            ans += groupsOfNumbers.reduce((acc, val) => acc + val, 0);
        }
        groupsOfNumbers.length = 0;
    }
}

// Last iteration
if (groupsOfNumbers.length > 0) {
    if (operator === '*') {
        ans += groupsOfNumbers.reduce((acc, val) => acc * val, 1);
    } else if (operator === '+') {
        ans += groupsOfNumbers.reduce((acc, val) => acc + val, 0);
    }
}

console.log(ans)