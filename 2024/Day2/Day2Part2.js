const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let currentNum, previousNum, nums, increasing, counter = 0, flag;

for (const line of arr) {
    nums = line.split(" ").map(e => parseInt(e));
    for (let i = 0; i < nums.length; i++) {
        modifiedNums = [...nums]; // clone
        modifiedNums.splice(i, 1); // brute force way
        currentNum = undefined;
        previousNum = undefined;
        increasing = undefined;
        flag = false;
        for (const num of modifiedNums) {
            currentNum = num;
            if (previousNum !== undefined) {
                if (increasing === undefined) {
                    if (currentNum === previousNum) { // edge case
                        flag = true;
                        break;
                    }
                    increasing = currentNum > previousNum;
                } else {
                    if (increasing && currentNum < previousNum) {
                        flag = true;
                        break;
                    } else if (!increasing && currentNum > previousNum) {
                        flag = true;
                        break;
                    }
                }
                if (Math.abs(currentNum - previousNum) > 3 || Math.abs(currentNum - previousNum) < 1) {
                    flag = true;
                    break;
                }
            }

            previousNum = currentNum;
        }
        if (!flag) {
            counter++;
            break;
        }
    }
}

console.log(counter);