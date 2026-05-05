const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

let [minX, combination, maxY] = arr[0].split("..");

minX = parseInt(minX.split("=")[1]);
let [maxX, minY] = combination.split(",");
maxX = parseInt(maxX);
minY = parseInt(minY.split("=")[1]);
maxY = parseInt(maxY);

// Find lowest vx to even reach minX
// vx + (vx - 1) + (vx - 2) + ... + 1 >= minX
// Same as 1 + 2 + ... + vx
function findMinVX(minX) {
	let vx = 0;
	let sum = 0;
	while (sum < minX) {
		vx++;
		sum += vx;
	}
	return vx;
}

const highestInitialYVelocity = -minY - 1;

const lowestInitialXVelocity = findMinVX(minX);

let counter = 0;

for (let i = minY; i <= highestInitialYVelocity; i++) {
	// i is initial y velocity
	for (let j = lowestInitialXVelocity; j <= maxX; j++) {
		// j is initial x velocity
		let currentX = 0;
		let currentY = 0;
		let yVelocity = i;
		let xVelocity = j;
		while (true) {
			if (currentY < minY) {
				break;
			}
			if (currentX > maxX) {
				break;
			}
			currentX += xVelocity;
			currentY += yVelocity;
			if (xVelocity > 0) {
				xVelocity--;
			}
			yVelocity--;
			if (checkTargetArea(currentX, currentY)) {
				counter++;
				break;
			}
		}
	}
}

console.log(counter);

function checkTargetArea(x, y) {
  	if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
    	return true;
  	} else {
    	return false;
  	}
}
