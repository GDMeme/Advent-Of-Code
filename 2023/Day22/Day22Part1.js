const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

for (let i = 0; i < arr.length; i++) {
    const [first, second] = arr[i].split('~');
    const [x1, y1, z1] = first.split(',').map(Number);
    const [x2, y2, z2] = second.split(',').map(Number);
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
    
    // Update bricks by reference (will be using arr later)
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

let ans = 0;
for (let i = 0; i < arr.length; i++) {
    let safe = true;

    for (const supportIdx of supports[i]) {
        if (supportedBy[supportIdx].size === 1) { // If any brick above is only supported by this brick
            safe = false;
            break;
        }
    }

    if (safe) {
        ans++;
    }
}

console.log(ans);