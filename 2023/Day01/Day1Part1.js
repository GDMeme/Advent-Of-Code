const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let temp;
let firstFound;
let secondFound;
let result = 0;
for (const word of arr) {
    temp = 0;
    firstFound = false;
    secondFound = false;
    for (const letter of word) {
        if (!isNaN(letter)) {
            temp = Number(letter);
            firstFound = true;
        }
        if (firstFound) {
            for (let i = word.length - 1; i >= 0; i--) {
                if (!isNaN(word[i])) {
                    temp = temp * 10 + Number(word[i]);
                    secondFound = true;
                    break;
                }
            }
        }
        if (secondFound) {
            break;
        }
    }
    result += temp;
}

console.log(result);