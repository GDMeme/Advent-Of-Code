const { readFileSync } = require("fs");

const arr = readFileSync("./input.txt", "utf-8").split(/\r?\n/);

let startingPosition;
let found = false;
for (let i = 0; i < arr.length && !found; i++) {
	for (let j = 0; j < arr[i].length; j++) {
		if (arr[i][j] === "S") {
			startingPosition = [j, i];
			found = true;
			break;
		}
	}
}

function outOfBounds(x, y) {
	return x < 0 || y < 0 || y >= arr.length || x >= arr[0].length;
}

// Assume that starting position can only be one possible pipe
// Find what pipe it is
const northPipes = new Map()
	.set("|", "south")
	.set("L", "east")
	.set("J", "west");

const southPipes = new Map()
	.set("|", "north")
	.set("7", "west")
	.set("F", "east");

const westPipes = new Map()
	.set("-", "east")
	.set("J", "north")
	.set("7", "south");

const eastPipes = new Map()
	.set("-", "west")
	.set("L", "north")
	.set("F", "south");

const directionArray = [
	[0, 1],
	[1, 0],
	[0, -1],
	[-1, 0],
];

const directionToCardinal = new Map()
	.set("0,1", "south") // Think like array indices
	.set("1,0", "east")
	.set("0,-1", "north")
	.set("-1,0", "west");

const cardinalToDirection = new Map()
	.set("north", [0, -1])
	.set("east", [1, 0])
	.set("south", [0, 1])
	.set("west", [-1, 0]);

const reverseCardinal = new Map()
	.set("north", "south")
	.set("south", "north")
	.set("west", "east")
	.set("east", "west");

const cardinalToMap = new Map()
	.set("north", northPipes)
	.set("south", southPipes)
	.set("west", westPipes)
	.set("east", eastPipes);

const possibleDirections = [];
for (let i = 0; i < directionArray.length; i++) {
	const [newX, newY] = [
		startingPosition[0] + directionArray[i][0],
		startingPosition[1] + directionArray[i][1],
	];
	if (outOfBounds(newX, newY)) {
		continue;
	}

	const directionCameFrom = reverseCardinal.get(
		directionToCardinal.get(directionArray[i].join(","))
	);
	if (cardinalToMap.get(directionCameFrom).has(arr[newY][newX])) {
		possibleDirections.push([
			newX,
			newY,
			reverseCardinal.get(directionCameFrom),
		]);
	}
}

const directionsToPipeType = new Map()
	.set("north,south", "|")
	.set("south,north", "|")
	.set("east,west", "-")
	.set("west,east", "-")
	.set("north,east", "L")
	.set("east,north", "L")
	.set("south,west", "7")
	.set("west,south", "7")
	.set("north,west", "J")
	.set("west,north", "J")
	.set("south,east", "F")
	.set("east,south", "F")
	

const startLetter = directionsToPipeType.get(`${possibleDirections[0][2]},${possibleDirections[1][2]}`);

let currCoordsAndDirection = possibleDirections[0];
const visited = new Set();
while (true) {
	visited.add(currCoordsAndDirection.slice(0, 2).join(','));
	const [currX, currY, cameFrom] = currCoordsAndDirection;
	const pipeMap = cardinalToMap.get(reverseCardinal.get(cameFrom));
	const pipeType = arr[currY][currX];
	if (pipeType === "S") {
		break;
	}
	const nextDirection = pipeMap.get(pipeType);
	const directionDelta = cardinalToDirection.get(nextDirection);
	const nextX = currX + directionDelta[0];
	const nextY = currY + directionDelta[1];
	currCoordsAndDirection = [nextX, nextY, nextDirection];
}

let enclosedTiles = 0;

for (let y = 0; y < arr.length; y++) {
	let inside = false;
	let crossings = 0;
	let prevPipe = "";

	for (let x = 0; x < arr[y].length; x++) {
		let pipe = visited.has(`${x},${y}`) ? arr[y][x] : undefined;

		if (pipe === "S") {
			pipe = startLetter;
		}

		if (pipe !== undefined && pipe !== "-") {
			crossings++;

			// Edge case
			if ((pipe === "J" && prevPipe === "F") || (pipe === "7" && prevPipe === "L")) {
				crossings--;
			}

			prevPipe = pipe;
			inside = crossings % 2 === 1;
		}

		if (inside && pipe === undefined) {
			enclosedTiles++;
		}
	}
}

console.log(enclosedTiles);
