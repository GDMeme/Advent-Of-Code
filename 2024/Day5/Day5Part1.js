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

let correctOrder;
let result = 0;

while (i < arr.length) {
    correctOrder = false;
    const numsToAvoid = new Set();
    const nums = arr[i].split(",").map(e => parseInt(e));   
    for (const num of nums) {
        if (numsToAvoid.has(num)) {
            correctOrder = true;
            break;
        }
        rulesMap.get(num)?.forEach(e => numsToAvoid.add(e));
    }
    if (!correctOrder) {
        result += nums[Math.floor(nums.length / 2)];
    }
    i++;
}

console.log(result)