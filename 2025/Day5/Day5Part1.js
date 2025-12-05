const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

const arr = syncReadFile('./input.txt');

const ranges = arr.slice(0, arr.indexOf(''));

ranges.sort((a, b) => {
    const [aStart, aEnd] = a.split('-').map(e => parseInt(e));
    const [bStart, bEnd] = b.split('-').map(e => parseInt(e));

    return aStart - bStart;
});

const currentRanges = [ranges[0]];

for (let i = 1; i < ranges.length; i++) {
    const [rangeStart, rangeEnd] = ranges[i].split('-').map(e => parseInt(e));
    for (let j = 0; j < currentRanges.length; j++) {
        const [currentRangeStart, currentRangeEnd] = currentRanges[j].split('-').map(e => parseInt(e));
        if (rangeStart > currentRangeEnd) { // Look for next range or add new range
            if (j === currentRanges.length - 1) {
                currentRanges.push(ranges[i]);
            }
            // Otherwise go to next range
            continue;
        }
        // Guaranteed to merge
        if (rangeEnd < currentRangeEnd) { // Smaller range
            continue;
        } else {
            // Remove future ranges that are covered by this merge
            if (j + 1 === currentRanges.length) { // Edge case, merge to end
                currentRanges[j] = `${currentRangeStart}-${rangeEnd}`;
                break;
            }
            for (let k = j + 1; k < currentRanges.length; k++) {
                const [nextRangeStart, nextRangeEnd] = currentRanges[k].split('-').map(e => parseInt(e));
                if (rangeEnd < nextRangeStart) { // Stop merging
                    currentRanges[j] = `${currentRangeStart}-${rangeEnd}`;
                    break;
                } else {
                    // Remove covered range and iterate again
                    currentRanges.splice(k, 1);
                    k--;
                }
            }
        }
    }
}

const IDs = arr.slice(arr.indexOf('') + 1).map(e => parseInt(e));
let ans = 0;

for (const ID of IDs) {
    for (const range of currentRanges) {
        const [rangeStart, rangeEnd] = range.split('-').map(e => parseInt(e));
        if (ID >= rangeStart && ID <= rangeEnd) {
            ans++;
            break;
        }
    }
}

console.log(ans)