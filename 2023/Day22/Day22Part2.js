const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

for (let i = 0; i < arr.length; i++) {
    const [first, second] = arr[i].split('~');
    const [x1, y1, z1] = first.split(',').map(Number);
    const [x2, y2, z2] = second.split(',').map(Number);
    // Normalize coordinates
    if (x1 > x2) {
        [x1, x2] = [x2, x1];
    }
    if (y1 > y2) {
        [y1, y2] = [y2, y1];
    }
    if (z1 > z2) {
        [z1, z2] = [z2, z1];
    }
    arr[i] = { x1, y1, z1, x2, y2, z2 };
}

arr.sort((a, b) => a.z1 - b.z1);

const topAt = new Map(); // key: "x,y" → highest z

for (const brick of arr) {
    const { x1, y1, x2, y2, z1, z2 } = brick;
    const height = z2 - z1 + 1;

    let supportZ = 0;
    
    for (let x = x1; x <= x2; x++) {
        for (let y = y1; y <= y2; y++) {
            const key = `${x},${y}`;
            if (topAt.has(key)) {
                supportZ = Math.max(supportZ, topAt.get(key));
            }
        }
    }
    
    // Update bricks by reference
    brick.z1 = supportZ + 1;
    brick.z2 = brick.z1 + height - 1;
    
    for (let x = brick.x1; x <= brick.x2; x++) {
        for (let y = brick.y1; y <= brick.y2; y++) {
            topAt.set(`${x},${y}`, brick.z2);
        }
    }
}

function overlapsXY(a, b) {
    return !(a.x2 < b.x1 || b.x2 < a.x1 || a.y2 < b.y1 || b.y2 < a.y1);
}

const supports = Array(arr.length).fill(0).map(() => new Set());
const supportedBy = Array(arr.length).fill(0).map(() => new Set());

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
        if (i === j) {
            continue;
        }

        const A = arr[i];
        const B = arr[j];

        if (A.z2 + 1 === B.z1 && overlapsXY(A, B)) { // Brick A (i) sitting directly below Brick B (j)
            supports[i].add(j);
            supportedBy[j].add(i);
        }
    }
}

let total = 0;

for (let i = 0; i < arr.length; i++) {
    // Make a copy of supportedBy to track remaining supports
    const remainingSupports = supportedBy.map(s => new Set(s));
    const fallen = new Set([i]);
    const queue = [i];

    while (queue.length > 0) {
        const currentBrick = queue.pop();

        for (const supportIdx of supports[currentBrick]) { // For each brick supported by the current fallen brick
            remainingSupports[supportIdx].delete(currentBrick);

            if (remainingSupports[supportIdx].size === 0 && !fallen.has(supportIdx)) {
                fallen.add(supportIdx);
                queue.push(supportIdx);
            }
        }
    }

    total += fallen.size - 1; // Exclude the initially removed brick
}

console.log(total);