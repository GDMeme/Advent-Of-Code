const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const H = arr.length;
const W = arr[0].length;

let startX;
let startY;

for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
        if (arr[y][x] === 'S') {
            startX = x;
            startY = y;
        }
    }
}

// Observation: 26501365 % 131 = 65
// So if I use the steps OFFSET, OFFSET + DIM, OFFSET + 2 * DIM for interpolation, it will end on the right spot
const STEPS = 26501365;
const DIM = W;
// From observing the input file, S is exactly in the middle and there are paths directly up, right, down, and left all the way to the edge without any rocks in the way
// As well, the input file is exactly a square 131x131, meaning the distance from S to the edge is exactly 65
const OFFSET = Math.floor(DIM / 2);

// Get 3 points, OFFSET, OFFSET + DIM, OFFSET + 2 * DIM to interpolate a quadratic
// The reachable plot count is guaranteed to be a quadratic because on an infinite grid without any rocks, the formula is 2N^2 + 2N + 1
// The rocks just subtract some points, but it's periodic with period DIM, so the formula still holds, but the coefficients will be different
// The wave grows outward like a diamond, its radius grows linearly so its perimeter grows linearly (something like n * 4(sqrt2)?), and the area inside grows quadratically.
const MAX_STEPS = OFFSET + 2 * DIM;

const directionArray = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const visited = new Map();
const frontier = [];

visited.set(`${startX},${startY}`, 0);
frontier.push({ x: startX, y: startY, depth: 0 });

// Step -> Count of new positions reached at that step
const countAtStep = new Map();

while (frontier.length) {
    const { x, y, depth } = frontier.shift();

    if (depth > MAX_STEPS) {
        break;
    }

    countAtStep.set(depth, (countAtStep.get(depth) || 0) + 1);

    for (const [dx, dy] of directionArray) {
        const newX = x + dx;
        const newY = y + dy;

        const key = `${newX},${newY}`;
        if (visited.has(key)) {
            continue;
            
        }

        // Infinite tiling
        const normalizedX = ((newX % W) + W) % W;
        const normalizedY = ((newY % H) + H) % H;

        if (arr[normalizedY][normalizedX] === '#') {
            continue;
        }

        visited.set(key, depth + 1);
        frontier.push({ x: newX, y: newY, depth: depth + 1 });
    }
}

// Precompute for slightly better performance
const evenSteps = Array(MAX_STEPS + 1).fill(0);
const oddSteps  = Array(MAX_STEPS + 1).fill(0);

for (let d = 0; d <= MAX_STEPS; d++) {
    const count = countAtStep.get(d) || 0;

    if (d === 0) {
        evenSteps[0] = count;
        oddSteps[0]  = 0;
    } else {
        evenSteps[d] = evenSteps[d - 1];
        oddSteps[d]  = oddSteps[d - 1];

        if (d % 2 === 0) {
            evenSteps[d] += count;
        } else {
            oddSteps[d] += count;
        }
    }
}

// Quadratic interpolation
// f(k) = reachable tiles after (OFFSET + k·DIM) steps
// Since OFFSET is odd: Math.floor(131 / 2) = 65, use oddSteps for y0
const y0 = oddSteps[OFFSET]; // f(0) = y0
const y1 = evenSteps[OFFSET + DIM]; // f(1) = y1
const y2 = oddSteps[OFFSET + 2 * DIM]; // f(2) = y2

// f(0) = c           = y0
// f(1) = a + b + c   = y1
// f(2) = 4a + 2b + c = y2

// y1 - y0 = a + b
// y2 - y1 = 3a + b

// (y2 − y1) − (y1 − y0) = 2a

// a = (y2 - 2 * y1 + y0) / 2;
// b = y1 - y0 - a;
// c = y0;

// Coefficients
const a = (y2 - 2 * y1 + y0) / 2;
const b = y1 - y0 - a;
const c = y0;

const n = Math.floor((STEPS - OFFSET) / DIM);

// I want to find the reachable tiles after n steps, or f(n)
// I have my quadratic coefficients, just plug them in
const answer = a * n * n + b * n + c;
console.log(answer);