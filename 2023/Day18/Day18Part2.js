const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const numToDirectionMap = new Map()
    .set('0', 'R')
    .set('1', 'D')
    .set('2', 'L')
    .set('3', 'U');

for (let i = 0; i < arr.length; i++) {
    const [direction, distance, colour] = arr[i].split(' ');
    const newDistance = parseInt(colour.slice(2, -2), 16);
    const newDirection = numToDirectionMap.get(colour.slice(-2, -1));
    arr[i] = `${newDirection} ${newDistance}`;
}

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

let currentCoords = [0, 0];
const vertices = [[0, 0]];
for (const line of arr) {
    const [direction, distance] = line.split(' ').map((e, i) => i === 1 ? parseInt(e) : e);
    
    const [dx, dy] = directionToDelta(direction);
    
    const newVertice = [currentCoords[0] + dx * distance, currentCoords[1] + dy * distance];
    currentCoords = newVertice;
    vertices.push(newVertice);
}

// Shoelace Formula
let area = 0;
for (let i = 0; i < vertices.length; i++) {
    const [x1, y1] = vertices[i];
    const [x2, y2] = vertices[(i + 1) % vertices.length]; // Wrap around for last coordinate
    
    // Add positive and negative triangles
    area += (x1 * y2 - y1 * x2) / 2;
}

let boundary = 0;
for (const line of arr) {
    boundary += parseInt(line.split(' ')[1]);
}

// Pick's Theorem
// Internal is 'area' variable
// Boundary is number of integer points on its boundary
// Area = Internal + (Boundary / 2) - 1
// Internal = Area - (Boundary / 2) + 1
// Internal + Boundary = Area + (Boundary / 2) + 1
const result = area + boundary / 2 + 1;
console.log(result);