const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// Brute force method
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

let lastSeenNumber = arr[0].length - 1;
let firstFreeSpace = newArr.indexOf(".");

let done = true;
let currentIteration = 1;

while (lastSeenNumber > firstFreeSpace) {
    const numNums = parseInt(arr[0][currentEndIndex]);
    const startingIndex = newArr.indexOf(currentEndFileID);
    
    if (done) {
        lastSeenNumber = startingIndex + numNums - 1;
    } else {
        lastSeenNumber--;
    }
        
    newArr[firstFreeSpace] = newArr[lastSeenNumber];
    newArr[lastSeenNumber] = ".";
    
    const possibleFreeSpace = firstFreeSpace + 1;
    firstFreeSpace = possibleFreeSpace === "." ? possibleFreeSpace : newArr.indexOf(".");
    
    if (currentIteration === numNums) {
        currentEndFileID--;
        currentEndIndex -= 2;
        done = true;
        currentIteration = 0;
    } else {
        done = false;
    }
    
    currentIteration++;
}



// Compute checksum
let result = 0;

for (let i = 0; i < newArr.length; i++) {
    if (newArr[i] !== "." && newArr[i] !== undefined) {
        result += i * newArr[i];
    }
}

console.log(result);