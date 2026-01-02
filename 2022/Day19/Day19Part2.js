// Sub 1 second runtime! (sometimes)

const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const start = performance.now();

const NUM_MINUTES = 32;

function runOneMinute(
    minute,
    robots, // [ore, clay, obsidian, geode]
    resources, // [ore, clay, obsidian, geode]
    costs, // [oreCost, clayCost, {ore, clay}, {ore, obsidian}]
    maxCosts, // [maxOre, maxClay, maxObsidian]
    cache,
    bestSoFar,
    skipped // [skippedOre, skippedClay, skippedObsidian]
) {
    if (minute > NUM_MINUTES) {
        return resources[3]; // geodes
    }

    const remaining = NUM_MINUTES - minute + 1;

    // Cap resources
    const capped = [
        Math.min(resources[0], remaining * maxCosts[0]),
        Math.min(resources[1], remaining * maxCosts[1]),
        Math.min(resources[2], remaining * maxCosts[2]),
        resources[3],
    ];

    // Generate cache key
    const key = [minute, ...robots, ...capped, ...skipped].join('|');
    if (cache.has(key)) {
        return cache.get(key);
    }

    const [oreCost, clayCost, obsCost, geodeCost] = costs;

    // Compute which robots can be built
    const canBuild = [
        robots[0] < maxCosts[0] && resources[0] >= oreCost, // ore
        robots[1] < maxCosts[1] && resources[0] >= clayCost, // clay
        robots[2] < maxCosts[2] && resources[0] >= obsCost.ore && resources[1] >= obsCost.clay, // obsidian
        resources[0] >= geodeCost.ore && resources[2] >= geodeCost.obsidian // geode
    ];

    // Collect resources for this minute
    const collected = resources.map((v, i) => v + robots[i]);

    // If can build geode every turn, there is no better option than to do so
    if (robots[0] >= geodeCost.ore && robots[2] >= geodeCost.obsidian) {
        const totalGeodes = collected[3] + robots[3] * remaining + ((remaining - 1) * remaining) / 2;
        bestSoFar.value = Math.max(bestSoFar.value, totalGeodes);
        return totalGeodes;
    }

    // Prune branches that can't beat best so far even if we build a geode every turn
    // n(n - 1) / 2 is the max extra geode robots we could build in remaining time
    const potentialGeodes = collected[3] + robots[3] * remaining + (remaining * (remaining - 1)) / 2;
    if (potentialGeodes <= bestSoFar.value) {
        return -Infinity;
    }

    // If can build a geode robot, do it immediately (I assume this is always optimal, maybe there's some extreme case where it's not?)
    if (canBuild[3]) {
        const newRobots = robots.slice();
        newRobots[3] += 1;
        const newResources = [
            collected[0] - geodeCost.ore,
            collected[1],
            collected[2] - geodeCost.obsidian,
            collected[3]
        ];
        const result = runOneMinute(minute + 1, newRobots, newResources, costs, maxCosts, cache, bestSoFar, [false, false, false]);
        bestSoFar.value = Math.max(bestSoFar.value, result);
        cache.set(key, result);
        return result;
    }

    // Mark robots we could build this turn but choose to wait
    const newSkipped = canBuild.slice(0, 3);
    
    // "Do nothing" branch
    let best = runOneMinute(minute + 1, robots, collected, costs, maxCosts, cache, bestSoFar, newSkipped);

    // Build ore/clay/obsidian robots
    for (let i = 0; i < 3; i++) {
        if (!canBuild[i] || skipped[i]) { // It's always suboptimal to build a robot we could have built last turn
            continue;
        }
        const newRobots = robots.slice();
        newRobots[i] += 1;

        const newResources = collected.slice();
        if (i === 0) {
            newResources[0] -= oreCost;
        }
        if (i === 1) {
            newResources[0] -= clayCost;
        }
        if (i === 2) {
            newResources[0] -= obsCost.ore;
            newResources[1] -= obsCost.clay;
        }

        // Reset skipped because we built this robot
        const result = runOneMinute(minute + 1, newRobots, newResources, costs, maxCosts, cache, bestSoFar, [false, false, false]);
        if (result > best) {
            best = result;
        }
    }

    if (best > bestSoFar.value) {
        bestSoFar.value = best;
    }

    cache.set(key, best);
    return best;
}

let ans = 1;
for (let i = 0; i < 3; i++) {
    const cache = new Map();
    const bestSoFar = { value: 0 }; // tracks best geodes for pruning

    const [oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost] = arr[i].split('.').map((e, j) => {
        if (j === 0) {
            return parseInt(e.match(/(\d+) ore/)[1]);
        }
        if (j === 1) {
            return parseInt(e.match(/(\d+) ore/)[1]);
        }
        if (j === 2) {
            return { ore: parseInt(e.match(/(\d+) ore/)[1]), clay: parseInt(e.match(/(\d+) clay/)[1]) };
        }
        if (j === 3) {
            return { ore: parseInt(e.match(/(\d+) ore/)[1]), obsidian: parseInt(e.match(/(\d+) obsidian/)[1]) };
        }
    });

    const maxOreCost = Math.max(oreRobotCost, clayRobotCost, obsidianRobotCost.ore, geodeRobotCost.ore);
    const maxClayCost = obsidianRobotCost.clay;
    const maxObsidianCost = geodeRobotCost.obsidian;

    const robots = [1, 0, 0, 0]; // ore, clay, obsidian, geode
    const resources = [0, 0, 0, 0]; // ore, clay, obsidian, geode

    const blueprintScore = runOneMinute(
        1, // minute
        robots,
        resources,
        [oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost],
        [maxOreCost, maxClayCost, maxObsidianCost],
        cache,
        bestSoFar,
        [false, false, false] // initially, nothing skipped
    );

    ans *= blueprintScore;
}

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);

console.log(ans);
