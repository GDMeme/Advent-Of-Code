const { readFileSync } = require('fs');

let xMap = new Map();
const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/).map((line, index) => {
    const [x, y, z] = line.split(',').map(Number);
    xMap.set(index, x);
    return { id: index, x, y, z };
});

let keyDist = []; // Form: {id1, id2, dist}

for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        const dist = Math.sqrt(
            Math.pow(arr[i].x - arr[j].x, 2) +
            Math.pow(arr[i].y - arr[j].y, 2) +
            Math.pow(arr[i].z - arr[j].z, 2)
        );

        keyDist.push({ id1: arr[i].id, id2: arr[j].id, dist });
    }
}

keyDist.sort((a, b) => a.dist - b.dist);

const connections = [];
const partOfConnection = new Set(); // Contains IDs part of any connection

let found = false;
while (!found) {
    for (const { id1, id2, dist } of keyDist) {
        if (partOfConnection.has(id1) && partOfConnection.has(id2)) {
            // Find both existing connections
            let connectionIndices = [];
            for (let i = 0; i < connections.length; i++) {
                if (connections[i].includes(id1) || connections[i].includes(id2)) {
                    connectionIndices.push(i);
                }
            }
            // Both IDs are in different connections - merge them
            if (connectionIndices.length === 2) {
                connections[connectionIndices[0]] = [...connections[connectionIndices[0]], ...connections[connectionIndices[1]]];
                connections.splice(connectionIndices[1], 1);
            }
        } else if (partOfConnection.has(id1) || partOfConnection.has(id2)) {
            const connectionToFind = partOfConnection.has(id1) ? id1 : id2;
            const idToAdd = partOfConnection.has(id1) ? id2 : id1;
            partOfConnection.add(idToAdd);
            // Find the existing connection
            for (const connection of connections) {
                if (connection.includes(connectionToFind)) {
                    connection.push(idToAdd);
                    break;
                }
            }
        } else { // New connection
            connections.push([id1, id2]);
            partOfConnection.add(id1);
            partOfConnection.add(id2);
        }

        // Found all in same circuit!
        if (connections.length === 1 && partOfConnection.size === arr.length) {
            ans = xMap.get(id1) * xMap.get(id2);
            found = true;
            break;
        }
    }
}

console.log(ans);