const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const rulesMap = new Map();

let i = 0;
while (arr[i] !== "") {
    const [left, right] = arr[i].split("|").map(e => parseInt(e));
    rulesMap.set(right, rulesMap.get(right) === undefined ? [left] : [...(rulesMap.get(right)), left]);
    i++;
}

i++;

let incorrectOrder;
let result = 0;

while (i < arr.length) {
    incorrectOrder = false;
    const numsToAvoid = new Set();
    const nums = arr[i].split(",").map(e => parseInt(e));   
    for (let j = 0; j < nums.length; j++) {
        if (numsToAvoid.has(nums[j])) {
            // Move incorrectly ordered number to front and reset j
            nums.unshift(nums[j]);
            nums.splice(j + 1, 1);
            j = 0;
            numsToAvoid.clear();
            incorrectOrder = true;
        }
        rulesMap.get(nums[j])?.forEach(e => numsToAvoid.add(e));
    }
    if (incorrectOrder) {
        result += nums[Math.floor(nums.length / 2)];
    }
    i++;
}

console.log(result)