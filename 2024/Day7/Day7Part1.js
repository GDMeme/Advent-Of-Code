const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

trueEquationIndexes = new Set();

function operate(nums, currentValue, operator, testValue, index) {
    if (operator === "+") {
        currentValue += nums.shift()
    } else {
        currentValue *= nums.shift();
    }
    if (nums.length === 0) {
        if (currentValue === testValue) {
            trueEquationIndexes.add(index);
        }
    } else {
        operate([...nums], currentValue, "+", testValue, index);
        operate(nums, currentValue, "*", testValue, index);
    }
}

let result = 0;

for (let i = 0; i < arr.length; i++) {
    let [testValue, nums] = arr[i].split(": ");
    testValue = parseInt(testValue);
    nums = nums.split(" ").map(e => parseInt(e));
    let currentValue = nums.shift();
    operate([...nums], currentValue, "+", testValue, i);
    operate([...nums], currentValue, "*", testValue, i);
    if (trueEquationIndexes.has(i)) {
        result += testValue;
    }
}

console.log(result);