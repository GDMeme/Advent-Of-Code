const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const arr = syncReadFile('./input.txt');

const ranges = arr[0].split(',');
let ans = 0;
for (const range of ranges) {
    const [startRange, endRange] = range.split('-').map(x => parseInt(x));
    const startLength = startRange.toString().length;

    let currentNumber;
    if (startLength % 2 === 0) {
        currentNumber = parseInt(startRange.toString().slice(0, startRange.toString().length / 2));
    } else {
        currentNumber = parseInt('1' + '0'.repeat(Math.floor(startRange.toString().length / 2)));
    }
    while (true) {
        const repeatedCurrentNumber = parseInt(currentNumber.toString().repeat(2));
        if (repeatedCurrentNumber < startRange) {
            currentNumber += 1;
            continue;
        }
        if (repeatedCurrentNumber > endRange) {
            break;
        }
        ans += repeatedCurrentNumber;
        currentNumber += 1;
    }
}

console.log(ans);