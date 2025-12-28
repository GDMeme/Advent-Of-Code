const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8')
    .split(/\r?\n\r?\n/)
    .map(section => section.split(/\r?\n/));

function findNumDifferences(a, b) {
    let differences = 0;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            differences++;
        }
    }
    return differences;
}
    
let ans = 0;
for (const pattern of arr) {
    let match;
    let numDifferences = 0;
    // Check rows
    for (let j = 0; j < pattern.length - 1; j++) {
        match = true;
        let leftPointer = j;
        let rightPointer = j + 1;
        numDifferences = 0;
        while (leftPointer >= 0 && rightPointer < pattern.length) {
            if (pattern[leftPointer] !== pattern[rightPointer]) {
                numDifferences += findNumDifferences(pattern[leftPointer], pattern[rightPointer]);
                if (numDifferences > 1) {
                    match = false;
                    break;
                }
            }
            leftPointer--;
            rightPointer++;
        }
        
        if (match && numDifferences === 1) {
            ans += 100 * (j + 1);
            break;
        }
    }
    
    if (match && numDifferences === 1) {
        continue;
    }
    
    // Check columns
    for (let j = 0; j < pattern[0].length - 1; j++) {
        match = true;
        let leftPointer = j;
        let rightPointer = j + 1;
        numDifferences = 0;
        while (leftPointer >= 0 && rightPointer < pattern[0].length) {
            for (let k = 0; k < pattern.length; k++) {
                if (pattern[k][leftPointer] !== pattern[k][rightPointer]) {
                    numDifferences += 1;
                    if (numDifferences > 1) {
                        match = false;
                        break;
                    }
                }
            }
            if (!match) {
                break;
            }
            leftPointer--;
            rightPointer++;
        }
        
        if (match && numDifferences === 1) {
            ans += (j + 1);
            break;
        }
    }
    
    if (!match || numDifferences !== 1) {
        console.log("No symmetry found");
    }
}

console.log(ans);