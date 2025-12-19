const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const arr = syncReadFile('./input.txt');

let ans = 0;
for (const line of arr) {
    const numSoFar = new Array(12);
    let currPos = 0;
    for (let i = 0; i < 12; i++) {
        let currNumToFind = 9;
        for (let j = currNumToFind; j >= 0; j--) {
            const possibleIndex = line.indexOf(j, currPos);
            if (possibleIndex !== -1) {
                // Check if there are enough numbers left
                if (possibleIndex + (12 - i) <= line.length) {
                    numSoFar[i] = j;
                    currPos = possibleIndex + 1;
                    break;
                }
            }
        }
    }
    ans += parseInt(numSoFar.join(''));
}

console.log(ans)