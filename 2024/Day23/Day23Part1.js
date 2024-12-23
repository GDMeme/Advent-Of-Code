const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const connectionsMap = new Map();
for (const line of arr) {
    const [left, right] = line.split("-");
    
    if (!connectionsMap.has(left)) {
        connectionsMap.set(left, []);
    }
    connectionsMap.get(left).push(right);
    
    if (!connectionsMap.has(right)) {
        connectionsMap.set(right, []);
    }
    connectionsMap.get(right).push(left);
}

let interConnections = new Set();

for (const [key, values] of connectionsMap) {
    if (key[0] === "t") {
        for (const value of values) {
            if (value === key) {
                continue;
            }
            for (const innerValue of connectionsMap.get(value)) {
                if (connectionsMap.get(innerValue).includes(key)) {
                    const interConnection = [key, value, innerValue].sort().join();
                    interConnections.add(interConnection);
                }
            }
        }
    }
}

console.log(interConnections.size);