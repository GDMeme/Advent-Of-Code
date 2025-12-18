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
		const score = newTime * tunnelMap.get(contester).flowRate;
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
	const queue = [currValve];
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
			for (let neighbor of tunnelMap.get(valve).neighbours) {
				nextQueue.push(neighbor);
			}
		}
		queue = nextQueue;
		traveled++;
	}
};

const contesters = [...tunnelMap.keys()].filter(
	(valve) => tunnelMap.get(valve).flowRate > 0
);

console.log(nextOptimalValve("AA", 30, contesters).value);