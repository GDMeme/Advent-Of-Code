const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const ranges = arr[0].split(',');
let ans = 0;
const foundNumbers = new Set();
for (const range of ranges) {
    const [startRange, endRange] = range.split('-').map(x => parseInt(x));
    const startLength = startRange.toString().length;
    const endLength = endRange.toString().length;

    let currentNumber = 1;
    // console.log("currentNumber start:", currentNumber);
    while (true) {
        let repeatedCurrentNumber = parseInt(currentNumber.toString().repeat(Math.ceil(startLength / currentNumber.toString().length)));
        // console.log("currentNumber: ", currentNumber);
        // console.log("repeatedCurrentNumber: ", repeatedCurrentNumber);
        while (repeatedCurrentNumber <= endRange) {
            if (repeatedCurrentNumber >= startRange && repeatedCurrentNumber <= endRange && !foundNumbers.has(repeatedCurrentNumber)) {
                foundNumbers.add(repeatedCurrentNumber);
                // console.log(repeatedCurrentNumber);
                ans += repeatedCurrentNumber;
            }
            repeatedCurrentNumber = parseInt(repeatedCurrentNumber.toString() + currentNumber.toString());
        }
        currentNumber += 1;

        if (currentNumber.toString().length > endLength / 2) {
            break;
        }
    }
}

console.log(ans);