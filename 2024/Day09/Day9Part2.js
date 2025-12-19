const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// Brute force method, 2 minute runtime
let newArr = new Array(70000);
let newArrIndex = 0;

let currentFileID = 0;

let currentEndIndex = 2 * Math.floor((arr[0].length - 1) / 2);
let currentEndFileID = Math.floor((arr[0].length - 1) / 2);

for (let i = 0; i < arr[0].length; i = i + 2) {
    for (let j = 0; j < parseInt(arr[0][i]); j++) {
        newArr[newArrIndex] = currentFileID;
        newArrIndex++;
    }
    currentFileID++;
    for (let j = 0; j < parseInt(arr[0][i + 1]); j++) {
        newArr[newArrIndex] = ".";
        newArrIndex++;
    }
}

let done = true;

let firstFreeSpace;

while (currentEndIndex !== 0) {
    const numNums = parseInt(arr[0][currentEndIndex]);
    const startingIndex = newArr.indexOf(currentEndFileID);
    if (done) {
        firstFreeSpace = newArr.indexOf(".");
    }
    if (firstFreeSpace > startingIndex) { // early exit
        currentEndFileID--;
        currentEndIndex -= 2;
        done = true;
        continue;
    }
    
    let length = 1;
    
    while (newArr[firstFreeSpace + length] === ".") {
        length++;
    }
    
    if (length >= numNums) {
        for (let k = 0; k < numNums; k++) {
            newArr[firstFreeSpace + k] = currentEndFileID;
            newArr[startingIndex + k] = ".";
        }
        done = true;
        currentEndFileID--;
        currentEndIndex -= 2;
    } else {
        firstFreeSpace = newArr.indexOf(".", firstFreeSpace + length);
        done = false;
    }
}


// Compute checksum
let result = 0;

for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] !== "." && newArr[i] !== undefined) {
        result += i * newArr[i];
    }
}

console.log(result);