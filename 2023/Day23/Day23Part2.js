const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').trimEnd().split(/\r?\n/);

const directionArray = [[0, -1], [1, 0], [0, 1], [-1, 0]];

function outOfBounds(x, y) {
    return y < 0 || y >= arr.length || x < 0 || x >= arr[0].length;
}

function validTile(x, y) {
    return !outOfBounds(x, y) && arr[y][x] !== '#';
}

const startX = arr[0].indexOf('.');
const startY = 0;

const endX = arr[arr.length - 1].indexOf('.');
const endY = arr.length - 1;

function degree(x, y) {
    let d = 0;
    for (const [dx, dy] of directionArray) {
        if (validTile(x + dx, y + dy)) {
            d++;
        }
    }
    return d;
}

const nodeCoordsToId = new Map(); // "x,y" -> id
let id = 0;

for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[0].length; x++) {
        if (!validTile(x, y)) {
            continue;
        }

        const deg = degree(x, y);
        // We only care about nodes that are endpoints or junctions
        if ((x === startX && y === startY) || (x === endX && y === endY) || deg > 2) {
            nodeCoordsToId.set(`${x},${y}`, id++);
        }
    }
}

// Example index: [[neighbourId, distance], ...]
// Index corresponds to nodeId
const graph = Array.from({ length: nodeCoordsToId.size }, () => []);

// Build graph by walking from each node to find connections
for (const [coord, nodeId] of nodeCoordsToId.entries()) {
    const [x, y] = coord.split(',').map(Number);

    // Pick an initial direction
    for (const [dx, dy] of directionArray) {
        let newX = x + dx;
        let newY = y + dy;

        if (!validTile(newX, newY)) {
            continue;
        }

        let previousX = x;
        let previousY = y;
        let dist = 1;

        while (true) {
            const k = `${newX},${newY}`;

            // Found an endpoint or junction
            if (nodeCoordsToId.has(k)) {
                graph[nodeId].push([nodeCoordsToId.get(k), dist]);
                break;
            }

            // Find next direction
            // There should only be one valid option since junctions are handled above
            let next = null;
            for (const [dx2, dy2] of directionArray) {
                const nextX = newX + dx2;
                const nextY = newY + dy2;
                if (!validTile(nextX, nextY)) {
                    continue;
                }
                
                // Don't go backwards
                if (nextX === previousX && nextY === previousY) {
                    continue;
                }
                next = [nextX, nextY];
            }

            if (!next) { // Found dead end
                break;
            }

            previousX = newX;
            previousY = newY;
            [newX, newY] = next;
            dist++;
        }
    }
}

const startNode = nodeCoordsToId.get(`${startX},${startY}`);
const endNode = nodeCoordsToId.get(`${endX},${endY}`);

let best = 0;

function dfs(node, visited, len) {
    if (node === endNode) {
        best = Math.max(best, len);
        return;
    }

    // Explore neighbours
    for (const [next, dist] of graph[node]) {
        if (visited.has(next)) {
            continue;
        }
        
        // Backtrack
        visited.add(next);
        dfs(next, visited, len + dist);
        visited.delete(next);
    }
}

dfs(startNode, new Set([startNode]), 0);
console.log(best);