const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function addToPerimeter(x1, x2, y1, y2, set) {
    if (x1 === x2) {
        if (y1 > y2) {
            while (y1 > y2) {
                set.add(`${x1},${y1}`);
                y1--;
            }
        } else {
            while (y1 < y2) {
                set.add(`${x1},${y1}`);
                y1++;
            }
        }
    } else {
        if (x1 > x2) {
            while (x1 > x2) {
                set.add(`${x1},${y1}`);
                x1--;
            }
        } else {
            while (x1 < x2) {
                set.add(`${x1},${y1}`);
                x1++;
            }
        }
    }
    
    return set;
}

function outOfBounds(x, y, minX, minY, maxX, maxY) {
    return x > maxX || y > maxY || x < minX || y < minY;
}

// Shrink the coordinates
const xSorted = arr.toSorted((a, b) => {
    const [aX] = a.split(',').map(Number);
    const [bX] = b.split(',').map(Number);
    return aX - bX;
});

const xMap = new Map();
const reverseXMap = new Map();
let currX = 0;
for (let i = 0; i < xSorted.length; i++) {
    const [x] = xSorted[i].split(',').map(Number);
    if (!xMap.has(x)) {
        xMap.set(x, currX);
        reverseXMap.set(currX, x);
        currX++;
    }
}

const ySorted = arr.toSorted((a, b) => {
    const [, aY] = a.split(',').map(Number);
    const [, bY] = b.split(',').map(Number);
    return aY - bY;
});

const yMap = new Map();
const reverseYMap = new Map();
let currY = 0;
for (let i = 0; i < ySorted.length; i++) {
    const [, y] = ySorted[i].split(',').map(Number);
    if (!yMap.has(y)) {
        yMap.set(y, currY);
        reverseYMap.set(currY, y);
        currY++;
    }
}

for (let i = 0; i < arr.length; i++) {
    const [x, y] = arr[i].split(',').map(Number);
    const shrinkX = xMap.get(x);
    const shrinkY = yMap.get(y);
    arr[i] = `${shrinkX},${shrinkY}`;
}

// Find perimeter coordinates
let perimeterCoords = new Set([arr[0]]);
const coords = arr.map(e => e.split(',').map(Number));

let minX = Infinity;
let maxX = -Infinity;
let minY = Infinity;
let maxY = -Infinity;

for (let i = 1; i < coords.length; i++) {
    const [prevX, prevY] = coords[i - 1];
    const [newX, newY] = coords[i];

    perimeterCoords = addToPerimeter(prevX, newX, prevY, newY, perimeterCoords);
    perimeterCoords.add(arr[i]);

	// Offset to make sure we can flood fill from the outside 
	if (newX > maxX - 1) {
		maxX = newX + 1; 
	}
	if (newY > maxY - 1) {
		maxY = newY + 1;
	}
	if (newX < minX + 1) {
		minX = newX - 1;
	}
	if (newY < minY + 1) {
		minY = newY - 1;
	}
}

// Last iteration (wrap around)
const [lastX, lastY] = coords[coords.length - 1];
const [firstX, firstY] = coords[0];

perimeterCoords = addToPerimeter(lastX, firstX, lastY, firstY, perimeterCoords);

const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];

// BFS to flood fill outside
const outsideCoords = new Set();
let frontier = [[minX, minY]];

while (frontier.length !== 0) {
    const [x, y] = frontier.pop();
    for (const [dx, dy] of directionArray) {
        const newX = x + dx;
        const newY = y + dy;
        const coordinateString = `${newX},${newY}`;
        if (outsideCoords.has(coordinateString) || perimeterCoords.has(coordinateString)) {
            continue;
        }
        
        if (outOfBounds(newX, newY, minX, minY, maxX, maxY)) {
            continue;
        }
        
        outsideCoords.add(coordinateString);
        frontier.push([newX, newY]);
    }
}

// Brute force all rectanges
let currMaxArea = 0;
for (let i = 0; i < arr.length; i++) {
    const [oldX, oldY] = arr[i].split(',').map(Number);
    for (let j = i + 1; j < arr.length; j++) {
        const [newX, newY] = arr[j].split(',').map(Number);
        
        // Early rejection
        const area = (Math.abs(reverseXMap.get(oldX) - reverseXMap.get(newX)) + 1) * (Math.abs(reverseYMap.get(oldY) - reverseYMap.get(newY)) + 1); // Since the area includes itself
        if (area <= currMaxArea) {
            continue;
        }
        
        const rectMinX = Math.min(oldX, newX);
        const rectMaxX = Math.max(oldX, newX);
        const rectMinY = Math.min(oldY, newY);
        const rectMaxY = Math.max(oldY, newY);
        
        let valid = true;
        for (let x = rectMinX; x <= rectMaxX && valid; x++) {
			if (x !== rectMinX && x !== rectMaxX) {
				continue;
			}
            for (let y = rectMinY; y <= rectMaxY; y++) {
				if (y !== rectMinY && y !== rectMaxY) {
					continue;
				}
				if (outsideCoords.has(`${x},${y}`)) {
					valid = false;
					break;
				}
            }
        }
        
        if (valid) { // Guaranteed to be greater
            currMaxArea = area;
        }
    }
}

console.log(currMaxArea)