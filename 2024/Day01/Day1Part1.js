const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const leftNums = new Array(arr.length);
const rightNums = new Array(arr.length);
for (let i = 0; i < arr.length; i++) {
    const [left, right] = arr[i].split("   ").map(e => parseInt(e));
    leftNums[i] = left;
    rightNums[i] = right;
}

leftNums.sort(function (a, b) {
    return a - b;
});

rightNums.sort(function (a, b) {
    return a - b;
});

let result = 0;
for (let i = 0; i < arr.length; i++) {
    result += Math.abs(leftNums[i] - rightNums[i]);
}

console.log(result);