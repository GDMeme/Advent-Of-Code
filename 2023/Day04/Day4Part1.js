const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let winningNumbers;
let yourNumbers;
let winningSet = new Set();
let temp;
let result = 0;

for (let i = 0; i < arr.length; i++) {
    temp = 0;
    arr[i] = arr[i].slice(arr[i].indexOf(":") + (arr[i][0] === " " ? 3 : 2)); // rid of everything up to colon + 1
    [winningNumbers, yourNumbers] = arr[i].split(" | ").map(e => e.split("  ").map(i => i.split(" ")).join().split(","));
    if (yourNumbers[0] === "") { // formatting :(
        yourNumbers = yourNumbers.slice(1);
    }
    winningNumbers.map(e => winningSet.add(e));
    for (let j = 0; j < yourNumbers.length; j++) {
        if (winningSet.has(yourNumbers[j])) {
            if (temp === 0) {
                temp = 1
            } else {
                temp *= 2;
            }
        }
    }
    result += temp;
    winningSet.clear();
}
console.log(result);