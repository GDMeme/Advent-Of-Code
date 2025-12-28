const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8')
    .split(/\r?\n\r?\n/)
    .map(section => section.split(/\r?\n/));

let ans = 0;
for (const pattern of arr) {
    let match;
    // Check rows
    for (let j = 0; j < pattern.length - 1; j++) {
        match = true;
        let leftPointer = j;
        let rightPointer = j + 1;
        while (leftPointer >= 0 && rightPointer < pattern.length) {
            if (pattern[leftPointer] !== pattern[rightPointer]) {
                match = false;
                break;
            }
            leftPointer--;
            rightPointer++;
        }
        
        if (match) {
            ans += 100 * (j + 1);
            break;
        }
    }
    
    if (match) {
        continue;
    }
    
    // Check columns
    for (let j = 0; j < pattern[0].length - 1; j++) {
        match = true;
        let leftPointer = j;
        let rightPointer = j + 1;
        while (leftPointer >= 0 && rightPointer < pattern[0].length) {
            for (let k = 0; k < pattern.length; k++) {
                if (pattern[k][leftPointer] !== pattern[k][rightPointer]) {
                    match = false;
                    break;
                }
            }
            if (!match) {
                break;
            }
            leftPointer--;
            rightPointer++;
        }
        
        if (match) {
            ans += (j + 1);
            break;
        }
    }
    
    if (!match) {
        console.log("No symmetry found");
    }
}

console.log(ans);