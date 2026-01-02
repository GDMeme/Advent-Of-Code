const { readFileSync } = require('fs');

const winds = readFileSync('./input.txt', 'utf-8');

const TARGET_ROCKS = 1_000_000_000_000;

function doWindPush(windCounter, currentRock, rockCoords) {
    const currentWindDirection = winds[windCounter % winds.length];

    if (currentWindDirection === '<') {
        if (
            Math.min(...currentRock.map(r => r[0])) > 0 &&
            !currentRock.some(r => rockCoords.has(`${r[0] - 1},${r[1]}`))
        ) {
            return currentRock.map(r => [r[0] - 1, r[1]]);
        }
    } else {
        if (
            Math.max(...currentRock.map(r => r[0])) < 6 &&
            !currentRock.some(r => rockCoords.has(`${r[0] + 1},${r[1]}`))
        ) {
            return currentRock.map(r => [r[0] + 1, r[1]]);
        }
    }
    return currentRock;
}

function dropRock(shape, heightToStart, rockCoords, windCounter, tallestHeight, colMax) {
    let currentRock = shape.map(([x, y]) => [x, y + heightToStart]);

    while (true) {
        currentRock = doWindPush(windCounter.value, currentRock, rockCoords);
        windCounter.value++;

        if (currentRock.some(r => rockCoords.has(`${r[0]},${r[1] - 1}`))) {
            for (const [x, y] of currentRock) {
                rockCoords.add(`${x},${y}`);
                
                if (y > colMax[x]) {
                    colMax[x] = y;
                }
                
                if (y > tallestHeight) {
                    tallestHeight = y;
                }
            }
            return tallestHeight;
        }

        currentRock = currentRock.map(([x, y]) => [x, y - 1]);
    }
}

const shapes = [
    [[2, 0], [3, 0], [4, 0], [5, 0]],
    [[2, 1], [3, 0], [3, 1], [3, 2], [4, 1]],
    [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
    [[2, 0], [2, 1], [2, 2], [2, 3]],
    [[2, 0], [2, 1], [3, 0], [3, 1]]
];

let tallestHeight = 0;

const rockCoords = new Set();
for (let x = 0; x <= 6; x++) {
    rockCoords.add(`${x},0`);
}

const colMax = Array(7).fill(0);

let windCounter = { value: 0 };

// Cycle detection
const seen = new Map();
let addedHeight = 0;
let rockCount = 0;

while (rockCount < TARGET_ROCKS) {
    const shapeIndex = rockCount % shapes.length;

    tallestHeight = dropRock(
        shapes[shapeIndex],
        tallestHeight + 4,
        rockCoords,
        windCounter,
        tallestHeight,
        colMax
    );

    rockCount++;

    // Build key to find cycle
    // Might not work for cursed inputs but works fine for AOC input
    const profile = colMax.map(h => tallestHeight - h);
    const windIndex = windCounter.value % winds.length;
    const key = `${shapeIndex}|${windIndex}|${profile.join(',')}`;

    // Cycle detection
    if (seen.has(key)) {
        const prev = seen.get(key);

        const cycleRocks = rockCount - prev.rockCount;
        const cycleHeight = tallestHeight - prev.tallestHeight;

        const remaining = TARGET_ROCKS - rockCount;
        const cycles = Math.floor(remaining / cycleRocks);

        addedHeight += cycles * cycleHeight;
        rockCount += cycles * cycleRocks;
    } else {
        seen.set(key, {
            rockCount,
            tallestHeight
        });
    }
}

console.log(tallestHeight + addedHeight);