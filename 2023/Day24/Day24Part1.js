const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/);

const minTestArea = 200000000000000;
const maxTestArea = 400000000000000;
// const minTestArea = 7;
// const maxTestArea = 27;

function findIntersection(a, b) {
    const { px: x1, py: y1, vx: vx1, vy: vy1 } = a;
    const { px: x2, py: y2, vx: vx2, vy: vy2 } = b;

    // Determinant
    const det = vx1 * vy2 - vy1 * vx2;
    if (det === 0) { // Parallel lines
        return 0;
    }

    const dx = x2 - x1;
    const dy = y2 - y1;

    // Check if the time that they intersect is in the future
    const t = (dx * vy2 - dy * vx2) / det;
    const u = (dx * vy1 - dy * vx1) / det;

    if (t < 0 || u < 0) {
        return 0;
    }

    const x = x1 + vx1 * t;
    const y = y1 + vy1 * t;

    if (x >= minTestArea && x <= maxTestArea && y >= minTestArea && y <= maxTestArea) {
        return 1;
    }

    return 0;
}

// Parse input
const hailstones = arr.map(line => {
    const [position, velocity] = line.split(' @ ');
    const [px, py] = position.split(', ').map(Number);
    const [vx, vy] = velocity.split(', ').map(Number);

    return { px, py, vx, vy };
});

// Count intersections
let intersectionCount = 0;
for (let i = 0; i < hailstones.length; i++) {
    for (let j = i + 1; j < hailstones.length; j++) {
        intersectionCount += findIntersection(hailstones[i], hailstones[j]);
    }
}

console.log(intersectionCount);
