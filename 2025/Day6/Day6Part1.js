const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const groupsOfNumbers = Array(arr[0].trim().split(/\s+/).length).fill(null).map(() => []);

arr.forEach(line => {
    line.trim().split(/\s+/).forEach((token, idx) => {
        if (token === '*' || token === '+') {
            groupsOfNumbers[idx].push(token);
        } else {
            groupsOfNumbers[idx].push(parseInt(token));
        }
    });
});

const results = groupsOfNumbers.map(group => {
    const operation = group.pop();
    if (operation === '*') {
        return group.reduce((acc, val) => acc * val, 1);
    } else if (operation === '+') {
        return group.reduce((acc, val) => acc + val, 0);
    }
});

console.log(results.reduce((acc, val) => acc + val, 0));