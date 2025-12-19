const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

function parseRebootStep(line) {
    const [onOff, coords] = line.split(' ');
    const parts = coords.split(',');
    const [x1, x2] = parts[0].split('=')[1].split('..').map(Number);
    const [y1, y2] = parts[1].split('=')[1].split('..').map(Number);
    const [z1, z2] = parts[2].split('=')[1].split('..').map(Number);
    return [onOff === 'on' ? 1 : 0, x1, x2, y1, y2, z1, z2];
}

// Note: The intersection will always be a cube
function intersection(cuboid, core) {
    // Flip the onOff state
    const state = 1 - core[0];
    const x1 = Math.max(cuboid[1], core[1]);
    const x2 = Math.min(cuboid[2], core[2]);
    const y1 = Math.max(cuboid[3], core[3]);
    const y2 = Math.min(cuboid[4], core[4]);
    const z1 = Math.max(cuboid[5], core[5]);
    const z2 = Math.min(cuboid[6], core[6]);
    
    // Check if intersection is non-empty
    if (x1 > x2 || y1 > y2 || z1 > z2) {
        return null;
    }
    
    return [state, x1, x2, y1, y2, z1, z2];
}

function getVolume(cuboid) {
    const [, x1, x2, y1, y2, z1, z2] = cuboid;
    return (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
}

const cuboids = arr.map(parseRebootStep);
const cores = [];

for (const cuboid of cuboids) {
    const toAdd = [];
    
    // If it's an "on" cuboid, add it to the list
    if (cuboid[0] === 1) {
        toAdd.push(cuboid);
    }
    
    // For every cuboid already in cores, find intersection
    for (const core of cores) {
        const inter = intersection(cuboid, core);
        if (inter) {
            toAdd.push(inter);
        }
    }
    
    cores.push(...toAdd);
}

// Calculate total volume: add state 1 cuboids, subtract state 0 cuboids
const total = cores.reduce((sum, cuboid) => {
    return sum + (cuboid[0] === 1 ? 1 : -1) * getVolume(cuboid);
}, 0);

console.log(total);

