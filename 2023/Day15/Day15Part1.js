const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)[0].split(',');

let ans = 0;
for (const step of arr) {
    let currValue = 0;
    for (let i = 0; i < step.length; i++) {
        const asciiValue = step.charCodeAt(i);
        currValue += asciiValue;
        currValue *= 17;
        currValue  %= 256;
    }
    ans += currValue;
}

console.log(ans);