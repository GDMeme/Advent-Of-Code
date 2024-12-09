const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// 1 => 0, 2 => 0, 3 => 2, 4 => 2
let currentEndIndex = 2 * Math.floor((arr[0].length - 1) / 2);

// 1 => 0, 2 => 0, 3 => 1, 4 => 1
let currentEndFileID = Math.floor((arr[0].length - 1) / 2);

let result = 0;

let currentStartFileID = 0;
let currentFileIndex = 0;

let numLeftover = 0;

let endProgram = false;

for (let i = 0; ; i = i + 2) {
    
    if (endProgram) {
        break;
    }
    
    const num = parseInt(arr[0][i]);
    for (let j = 0; j < num; j++) {
        result += currentStartFileID * currentFileIndex;
        currentFileIndex++;
    }
    
    currentStartFileID++;
    
    // Get size of free space
    const numFreeSpace = parseInt(arr[0][i + 1]);
    
    let numFilledSoFar = 0;
    let flag = false;
    while (!flag) { // While empty space not filled
        if (currentEndIndex === i + 2 || currentEndIndex === i) {
            for (let j = 0; j < numLeftover; j++) {
                result += currentEndFileID * currentFileIndex;
                currentFileIndex++;
            }
            flag = true;
            
            // Program should end here
            endProgram = true;
            break;
        }
        
        // There are previous numbers left over
        if (numLeftover !== 0) {
            // More leftover numbers than empty space
            if (numLeftover > numFreeSpace) {
                for (let j = 0; j < numFreeSpace; j++) {
                    result += currentEndFileID * currentFileIndex;
                    currentFileIndex++;
                }
                numLeftover = numLeftover - numFreeSpace;
                
                flag = true;
            // Not enough leftover numbers can fit in empty space
            } else {
                for (let j = 0; j < numLeftover; j++) {
                    result += currentEndFileID * currentFileIndex;
                    currentFileIndex++;
                }
                currentEndIndex -= 2;
                currentEndFileID--;
                
                if (numLeftover === numFreeSpace) {
                    flag = true;
                }
                numFilledSoFar += numLeftover;
                numLeftover = 0;
            }
        // No previous numbers leftover, get the next number
        } else {
            // More numbers than can fit in the empty space
            if (numFilledSoFar + parseInt(arr[0][currentEndIndex]) > numFreeSpace) {
                for (let j = 0; j < numFreeSpace - numFilledSoFar; j++) {
                    result += currentEndFileID * currentFileIndex;
                    currentFileIndex++;
                }
                numLeftover = parseInt(arr[0][currentEndIndex]) - (numFreeSpace - numFilledSoFar);
                
                flag = true;
            // Not enough numbers can fit in the empty space
            } else {
                for (let j = 0; j < parseInt(arr[0][currentEndIndex]); j++) {
                    result += currentEndFileID * currentFileIndex;
                    currentFileIndex++;
                }
                numFilledSoFar += parseInt(arr[0][currentEndIndex]);
                
                currentEndIndex -= 2;
                currentEndFileID--;
                
                numLeftover = 0;
                if (numFilledSoFar === numFreeSpace) {
                    flag = true;
                }
            }
        }
    }
}

console.log(result);