const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const cache = new Map();
function findCombinations(springs, groups) {
    const line = `${springs} ${groups.join(',')}`;
    if (cache.has(line)) {
        return cache.get(line);
    }
    // Check if there are any remaining '#' that we didn't use
    if (groups.length <= 0) {
        return Number(!springs.includes("#"));
    }
    
    // Check if impossible to fit
    if (springs.length - groups.reduce((a, b) => a + b, 0) - groups.length + 1 < 0) {
        return 0;
    }
    // Check for no operational springs in first group
    const damagedOrUnknown = !springs.slice(0, groups[0]).includes(".") ? 1 : 0;
    if (springs.length === groups[0]) {
        return damagedOrUnknown;
    }
    // First part is skipping the first character, second part is using the first character
    // Character after the first group must not be a '#'
    const total = (springs[0] !== '#' ?  findCombinations(springs.slice(1), groups) : 0) +
        (damagedOrUnknown && springs[groups[0]] !== '#' ? findCombinations(springs.slice(groups[0] + 1), groups.slice(1)) : 0);
    
    cache.set(line, total);
    return total;
}

let ans = 0;
for (const line of arr) {
    const [springs, groups] = line.split(' ').map((e, i) => i === 1 ? e.split(',').map(Number) : e);
    ans += findCombinations(springs, groups)
}

console.log(ans);

