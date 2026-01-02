// Meh, fast enough for Part 1. Considering more optimizations for Part 2

const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);
const NUM_MINUTES = 24;
const cache = new Map();

function canBuildOreRobot(numOre, oreRobotCost) {
	return numOre >= oreRobotCost;
}

function canBuildClayRobot(numOre, clayRobotCost) {
	return numOre >= clayRobotCost;
}

function canBuildObsidianRobot(numOre, numClay, obsidianRobotCost) {
	return numOre >= obsidianRobotCost.ore && numClay >= obsidianRobotCost.clay;
}

function canBuildGeodeRobot(numOre, numObsidian, geodeRobotCost) {
	return numOre >= geodeRobotCost.ore && numObsidian >= geodeRobotCost.obsidian;
}

function runOneMinute(minute, numRobots, numOre, numClay, numObsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost) {
	if (minute > NUM_MINUTES) {
		return numGeode;
	}
	
	const remaining = NUM_MINUTES - minute;

	numOre = Math.min(numOre, remaining * maxOreCost);
	numClay = Math.min(numClay, remaining * maxClayCost);
	numObsidian = Math.min(numObsidian, remaining * maxObsidianCost);
	
	const key = [
        minute,
        numRobots.get('ore'),
        numRobots.get('clay'),
        numRobots.get('obsidian'),
        numRobots.get('geode'),
        numOre,
        numClay,
        numObsidian,
        numGeode
    ].join('|');
	
	if (cache.has(key)) {
        return cache.get(key);
    }
	
	let canBuildRobots = Array(4).fill(0);
	
	if (numRobots.get('ore') < maxOreCost && canBuildOreRobot(numOre, oreRobotCost)) {
		canBuildRobots[0] = 1;
	}
	if (numRobots.get('clay') < maxClayCost && canBuildClayRobot(numOre, clayRobotCost)) {
		canBuildRobots[1] = 1;
	} 
	if (numRobots.get('obsidian') < maxObsidianCost && canBuildObsidianRobot(numOre, numClay, obsidianRobotCost)) {
		canBuildRobots[2] = 1;
	}
	if (canBuildGeodeRobot(numOre, numObsidian, geodeRobotCost)) {
		canBuildRobots[3] = 1;
	}
	
	for (const [robotType, count] of numRobots) {
		// Collect resources
		numOre += (robotType === 'ore') ? count : 0;
		numClay += (robotType === 'clay') ? count : 0;
		numObsidian += (robotType === 'obsidian') ? count : 0;
		numGeode += (robotType === 'geode') ? count : 0;
	}
	
	const best = runOneMinute(
		minute + 1,
		numRobots,
		numOre,
		numClay,
		numObsidian,
		numGeode,
		oreRobotCost,
		clayRobotCost,
		obsidianRobotCost,
		geodeRobotCost,
		maxOreCost,
		maxClayCost,
		maxObsidianCost
	);
	
	const result = Math.max(
		best,
		...canBuildRobots.map((canBuild, index) => {
			if (canBuild) {
				if (index === 0) {
					const newNumRobots = new Map(numRobots);
					newNumRobots.set('ore', numRobots.get('ore') + 1);
					return runOneMinute(minute + 1, newNumRobots, numOre - oreRobotCost, numClay, numObsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost);
				} else if (index === 1) {
					const newNumRobots = new Map(numRobots);
					newNumRobots.set('clay', numRobots.get('clay') + 1);
					return runOneMinute(minute + 1, newNumRobots, numOre - clayRobotCost, numClay, numObsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost);
				} else if (index === 2) {
					const newNumRobots = new Map(numRobots);
					newNumRobots.set('obsidian', numRobots.get('obsidian') + 1);
					return runOneMinute(minute + 1, newNumRobots, numOre - obsidianRobotCost.ore, numClay - obsidianRobotCost.clay, numObsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost);
				} else if (index === 3) {
					const newNumRobots = new Map(numRobots);
					newNumRobots.set('geode', numRobots.get('geode') + 1);
					return runOneMinute(minute + 1, newNumRobots, numOre - geodeRobotCost.ore, numClay, numObsidian - geodeRobotCost.obsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost);
				}
			} else {
				return -Infinity;
			}
		})
	);
	
	cache.set(key, result);
	return result;
}

let ans = 0;
for (let i = 0; i < arr.length; i++) {
	cache.clear();
	const [oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost] = arr[i].split('.').map((e, i) => {
		if (i === 0) {
			return parseInt(e.match(/(\d+) ore/)[1]);			
		} else if (i === 1) {
			return parseInt(e.match(/(\d+) ore/)[1]);
		} else if (i === 2) {
			const obsidianRobotOre = parseInt(e.match(/(\d+) ore/)[1]);
			const obsidianRobotClay = parseInt(e.match(/(\d+) clay/)[1]);
			return { ore: obsidianRobotOre, clay: obsidianRobotClay };
		} else if (i === 3) {
			const geodeRobotOre = parseInt(e.match(/(\d+) ore/)[1]);
			const geodeRobotObsidian = parseInt(e.match(/(\d+) obsidian/)[1]);
			return { ore: geodeRobotOre, obsidian: geodeRobotObsidian };
		}
	});
	
	const maxOreCost = Math.max(
		oreRobotCost,
		clayRobotCost,
		obsidianRobotCost.ore,
		geodeRobotCost.ore
	);
	
	const maxClayCost = obsidianRobotCost.clay;
	const maxObsidianCost = geodeRobotCost.obsidian;
	
	const numRobots = new Map()
		.set('ore', 1)
		.set('clay', 0)
		.set('obsidian', 0)
		.set('geode', 0);
		
	let numOre = 0;
	let numClay = 0;
	let numObsidian = 0;
	let numGeode = 0;
	
	let minute = 1;
	
	// i + 1 is blueprint ID number
	ans += (i + 1) * runOneMinute(minute, numRobots, numOre, numClay, numObsidian, numGeode, oreRobotCost, clayRobotCost, obsidianRobotCost, geodeRobotCost, maxOreCost, maxClayCost, maxObsidianCost);
}

console.log(ans);
