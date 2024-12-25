const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const locks = new Set();
const keys = new Set();

const maxLength = 6;
const width = 5;

let currentIndex = 0;
while (currentIndex < arr.length) {
    // Lock
    if (arr[currentIndex] === "#####") {
        let index = 0;
        let currentLock = [];
        while (index < width) {
            let length;
            for (let i = 0; i < maxLength; i++) {
                if (currentIndex + i >= arr.length || arr[currentIndex + i][index] !== "#") {
                    length = i - 1;
                    break;
                }
            }
            currentLock.push(length ?? maxLength - 1);
            
            index++;
        }
        locks.add(currentLock);
    } else { // Key
        let index = 0;
        let currentKey = [];
        while (index < width) {
            let length;
            for (let i = 0; i < maxLength; i++) {
                if (currentIndex + i >= arr.length || arr[currentIndex + i][index] === "#") {
                    length = maxLength - i;
                    break;
                }
            }
            currentKey.push(length ?? 0);
            
            index++;
        }
        keys.add(currentKey);
    }
    currentIndex += 8;
}

let result = 0;

for (const lock of locks) {
    for (const key of keys) {
        let fits = true;
        for (let i = 0; i < width; i++) {
            if (key[i] + lock[i] > maxLength - 1) {
                fits = false;
                break;
            }
        }
        if (fits) {
            result += 1;
        }
    }
}

console.log(result);