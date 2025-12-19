const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let oldArr = syncReadFile('./input.txt');
let arr = [];

for (let i = 0; i < oldArr.length; i++) { // convert it to an actual array
    if (oldArr[i] === '') {
        continue;
    } else {
        arr.push(JSON.parse(oldArr[i]));
    }
}

arr.push([[2]]);
arr.push([[6]]);

/**
 * Returns -1 if first < second, 0 if first == second, and 1 if first > second.
 * @param {number | [number]} first 
 * @param {number | [number]} second 
 */
function compare(first, second) {
    const [firstIsArray, secondIsArray] = [first, second].map(item => Array.isArray(item));
    if (firstIsArray) {
        if (secondIsArray) {
            for (let i = 0; i < Math.min(first.length, second.length); i++) {
                const result = compare(first[i], second[i]);
                if (result !== 0) {
                    return result;
                }
            }
            const d = first.length - second.length;
            if (d === 0) {
                return 0;
            }
            return d / Math.abs(d);
        }
        // First is array, second is int
        else {
            return compare(first, [second]);
        }
    }
    // First is int
    else {
        if (secondIsArray) {
            return compare([first], second);
        }
        // First is int, second is int
        else {
            if (first > second) {
                return 1;
            } else if (first === second) {
                return 0;
            } else {
                return -1;
            }
        }
    }
}

for (let i = 0; i < arr.length - 1; i++) {
    // Returns -1 if first < second, 0 if first == second, and 1 if first > second.
    arr.sort(compare);
}
let firstIndex = 0;
let secondIndex = 0;
for (let i = 0; i < arr.length; i++) {
    if (JSON.stringify(arr[i]) === '[[2]]') {
        firstIndex = i + 1;
    } else if (JSON.stringify(arr[i]) === '[[6]]') {
        secondIndex = i + 1;
    }
} 
console.log(firstIndex * secondIndex);