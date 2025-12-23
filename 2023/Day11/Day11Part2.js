const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const emptyRows = new Set();
for (let i = 0; i < arr.length; i++) {
    let foundGalaxy = false;
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] !== '.') {
            foundGalaxy = true;
            break;
        }
    }
    
    if (!foundGalaxy) {
        emptyRows.add(i);
    }
}

const emptyColumns = new Set();
for (let j = 0; j < arr[0].length; j++) {
    let foundGalaxy = false;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][j] !== '.') {
            foundGalaxy = true;
            break;
        }
    }
    
    if (!foundGalaxy) {
        emptyColumns.add(j);
    }
}

const galaxies = [];

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '#') {
            galaxies.push(`${j},${i}`);
        }
    }
}

let ans = 0;
for (let i = 0; i < galaxies.length; i++) {
    // Find closest galaxy
    const [x, y] = galaxies[i].split(',').map(Number);
    for (let j = i + 1; j < galaxies.length; j++) {
        const [x2, y2] = galaxies[j].split(',').map(Number);
        
        const deltaX = Math.abs(x2 - x);
        const deltaY = Math.abs(y2 - y);
        
        let distance = deltaX + deltaY;
        
        let smallX = Math.min(x, x2);
        let largeX = Math.max(x, x2);
        let smallY = Math.min(y, y2);
        let largeY = Math.max(y, y2);
        
        for (let k = smallX + 1; k < largeX; k++) {
            if (emptyColumns.has(k)) {
                distance += 999999;
            }
        }
        
        for (let k = smallY + 1; k < largeY; k++) {
            if (emptyRows.has(k)) {
                distance += 999999;
            }
        }
        
        ans += distance;
    }
}

console.log(ans);