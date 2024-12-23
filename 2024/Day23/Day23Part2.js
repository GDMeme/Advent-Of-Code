const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function DFS(key, i, currentGroup) {
    const values = connectionsMap.get(key);
    
    let largestGroup = currentGroup;
    for (i; i < values.length; i++) {
        const currentValue = values[i];
        let match = true;
        
        for (let j = 1; j < currentGroup.length; j++) {
            if(!connectionsMap.get(currentGroup[j]).includes(currentValue)) {
                match = false;
                break;
            }
        }
        if (!match) {
            continue;
        }
        
        newPath = [...currentGroup, currentValue];
        
        const newGroup = DFS(key, i + 1, newPath);
        if (newGroup.length > largestGroup.length) {
            largestGroup = newGroup;
        }
    }
    return largestGroup;
}

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

let globalMax = [];

for (let key of connectionsMap.keys()) {
    let currentMax = DFS(key, 0, [key]);
    if (currentMax.length > globalMax.length) {
        globalMax = currentMax;
    }
}

console.log(globalMax.sort().join(","));