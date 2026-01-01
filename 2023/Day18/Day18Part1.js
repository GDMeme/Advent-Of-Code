const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function directionToDelta(direction) {
    switch (direction) {
        case 'U': 
            return [0, -1];
        case 'D': 
            return [0, 1];
        case 'L':
            return [-1, 0];
        case 'R':
            return [1, 0];
    }
}

// Ray casting algorithm
function pointInPolygon(x, y, polygon) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i][0];
        const yi = polygon[i][1];
        const xj = polygon[j][0];
        const yj = polygon[j][1];
        // If pointing a laser to the right, does it cross this edge?
        // Find x coordinate of intersection of edge with horizontal line at y
        // Check if the x coordinate of the point is less than that intersection
        if (((yi > y) !== (yj > y)) &&
            (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
            inside = !inside;
        }
    }
    return inside;
}

let currentCoords = [0, 0];
let minX = 0;
let maxX = 0;
let minY = 0;
let maxY = 0;
const visited = new Set([currentCoords.join(',')]);
for (const line of arr) {
    const [direction, distance, colour] = line.split(' ').map((e, i) => i === 1 ? parseInt(e) : e);
    const [dx, dy] = directionToDelta(direction);
    for (let i = 0; i < distance; i++) {
        currentCoords[0] += dx;
        currentCoords[1] += dy;
        visited.add(currentCoords.join(','));
        
        if (currentCoords[0] < minX) {
            minX = currentCoords[0];
        } else if (currentCoords[0] > maxX) {
            maxX = currentCoords[0];
        }
        
        if (currentCoords[1] < minY) {
            minY = currentCoords[1];
        } else if (currentCoords[1] > maxY) {
            maxY = currentCoords[1];
        }
    }
}

// Find a point inside the polygon
const polygon = Array.from(visited).map(s => s.split(',').map(Number));
let found = null;
for (let x = minX + 1; x < maxX; x++) {
    for (let y = minY + 1; y < maxY; y++) {
        const key = `${x},${y}`;
        if (!visited.has(key) && pointInPolygon(x, y, polygon)) {
            found = [x, y];
            break;
        }
    }
    if (found) {
        break;
    }
}

// Flood fill
const directionArray = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const floodQueue = [found];
while (floodQueue.length > 0) {
    const [x, y] = floodQueue.shift();
    for (const [dx, dy] of directionArray) {
        const newX = x + dx;
        const newY = y + dy;
        const key = `${newX},${newY}`;
        if (!visited.has(key)) {
            visited.add(key);
            floodQueue.push([newX, newY]);
        }
    }
}

console.log(visited.size);
