const { readFileSync } = require('fs');

const tunnelMap = new Map();
readFileSync('./input.txt', 'utf-8').split(/\r?\n/).map(line => {
    const neighbours = line.split(', ');
    neighbours[0] = neighbours[0].slice(-2);

    const valve = line.split(" ")[1];
    const flowRate = parseInt(line.split('=')[1].split(';')[0]);

    tunnelMap.set(valve, { flowRate, neighbours });
});

const distanceMemo = new Map();

function distanceMemoKey(currValve, targetValve) {
    return currValve < targetValve
        ? currValve + targetValve
        : targetValve + currValve;
};

function nextOptimalValve(currValve, timeLeft, contesters) {
    let optimalValve = null;
    let value = 0;

    for (const contester of contesters) {
        const newContesters = [...contesters].filter((v) => v !== contester);
        const newTime = timeLeft - distanceTo(currValve, contester) - 1;
        if (newTime <= 0) {
            continue;
        }
        let score = newTime * tunnelMap.get(contester).flowRate;
        const optimal = nextOptimalValve(contester, newTime, newContesters);
        score += optimal.value;

        if (score > value) {
            optimalValve = contester;
            value = score;
        }
    }

    return { optimalValve, value };
};

function distanceTo(currValve, targetValve) {
    const key = distanceMemoKey(currValve, targetValve);
    if (distanceMemo.has(key)) {
        return distanceMemo.get(key);
    }
    const visited = new Set();
    let queue = [currValve];
    let traveled = 0;

    while (queue.length > 0) {
        const nextQueue = [];
        for (const valve of queue) {
            if (visited.has(valve)) {
                continue;
            }
            visited.add(valve);
            if (valve === targetValve) {
                distanceMemo.set(key, traveled);
                return traveled;
            }
            for (const neighbor of tunnelMap.get(valve).neighbours) {
                nextQueue.push(neighbor);
            }
        }
        queue = nextQueue;
        traveled++;
    }
};

function efficientlySplit(contesters) {
    let bestPressure = 0;
    let myValves = [];
    let elephantValves = [];

    // Generate all 2^n possible splits using bit masking
    const numSplits = Math.pow(2, contesters.length);
    for (let mask = 0; mask < numSplits; mask++) {
        const elephantValvesTest = [];
        const myValvesTest = [];
        for (let i = 0; i < contesters.length; i++) {
            if (mask & (1 << i)) {
                myValvesTest.push(contesters[i]);
            } else {
                elephantValvesTest.push(contesters[i]);
            }
        }
        // Calculate the actual pressure released by this split
        const myPressure = nextOptimalValve("AA", 26, myValvesTest).value;
        const elephantPressure = nextOptimalValve("AA", 26, elephantValvesTest).value;
        const totalPressure = myPressure + elephantPressure;

        if (totalPressure > bestPressure) {
            bestPressure = totalPressure;
            myValves = myValvesTest;
            elephantValves = elephantValvesTest;
        }
    }
    return { myValves, elephantValves };
};

const contesters = [...tunnelMap.keys()].filter(
    (valve) => tunnelMap.get(valve).flowRate > 0
);

let { myValves, elephantValves } = efficientlySplit(contesters);

let pressureReleased = 0;
pressureReleased += nextOptimalValve("AA", 26, myValves).value;
pressureReleased += nextOptimalValve("AA", 26, elephantValves).value;

console.log(pressureReleased);
