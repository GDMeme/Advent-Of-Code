const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

rightMap = new Map();
leftNums = new Array(arr.length);
for (let i = 0; i < arr.length; i++) {
    const [left, right] = arr[i].split("   ").map(e => parseInt(e));
    rightMap.set(right, rightMap.get(right) === undefined ? 1 : rightMap.get(right) + 1);
    leftNums[i] = left;
}

result = 0;
for (let i = 0; i < arr.length; i++) {
    result += leftNums[i] * (rightMap.get(leftNums[i]) ?? 0);
}

console.log(result);

