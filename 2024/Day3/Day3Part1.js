const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let result = 0;

for (const line of arr) {
    const sections = line.split("mul(");
    for (const section of sections) {
        const check = section.split(")")[0];
        const nums = check.split(",");
        if (nums.length !== 2 || isNaN(nums[0]) || isNaN(nums[1])) {
            continue;
        }
        nums.map(e => parseInt(e));
        
        result += nums[0] * nums[1];
    }
}

console.log(result)