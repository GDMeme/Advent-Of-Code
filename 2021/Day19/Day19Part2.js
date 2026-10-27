const { readFileSync } = require('fs');
const { exit } = require('process');

const arr = readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/);

function generateRotations([x, y, z]) {
    return [
        [ x,  y,  z],
        [ x, -y, -z],
        [ x,  z, -y],
        [ x, -z,  y],

        [-x,  y, -z],
        [-x, -y,  z],
        [-x,  z,  y],
        [-x, -z, -y],

        [ y,  x, -z],
        [ y, -x,  z],
        [ y,  z,  x],
        [ y, -z, -x],

        [-y,  x,  z],
        [-y, -x, -z],
        [-y,  z, -x],
        [-y, -z,  x],

        [ z,  x,  y],
        [ z, -x, -y],
        [ z,  y, -x],
        [ z, -y,  x],

        [-z,  x, -y],
        [-z, -x,  y],
        [-z,  y,  x],
        [-z, -y, -x]
    ];
}

function findCorrectTranslation(scanner) {
    const globalCoordinates = [...globalBeacons].map(
        coordinate => coordinate.split(',').map(e => parseInt(e))
    );
    
    for (let rotation = 0; rotation < 24; rotation++) {
        // Rotate every beacon using the same rotation
        const rotatedBeacons = scanner.map(([x, y, z]) => {
            return generateRotations([x, y, z])[rotation];
        });
        
        const occurrenceMap = new Map();
        for (const [x, y, z] of rotatedBeacons) {
            for (const [globalX, globalY, globalZ] of globalCoordinates) {
                
                const dx = globalX - x;
                const dy = globalY - y;
                const dz = globalZ - z;
                
                const key = `${dx},${dy},${dz}`;
                
                const count = (occurrenceMap.get(key) || 0) + 1
                
                occurrenceMap.set(key, count);
                
                if (count === 12) {
                    return [
                        [dx, dy, dz],
                        rotatedBeacons
                    ];
                }
            }
        }
    }
    
    return false;
}

const scanners = [];
let currentScanner = [];
for (let i = 1; i < arr.length; i++) { // Skip the first line
    if (arr[i].slice(0, 3) === '---' || arr[i] === '') {
        if (currentScanner.length > 0) {
            scanners.push(currentScanner);
            currentScanner = [];
        }
            
        continue;
    }
    
    const [x, y, z] = arr[i].split(',').map(e => parseInt(e));
    
    currentScanner.push([x, y, z]);
}

// Push the last scanner
scanners.push(currentScanner);

const globalBeacons = new Set(scanners.shift().map(beacon => beacon.join(',')));
const globalScanners = [[0, 0, 0]]; // Add the first scanner
while (scanners.length > 0) {
    let foundScanner = false;
    for (let i = 0; i < scanners.length; i++) {
        const result = findCorrectTranslation(scanners[i])
        
        if (!result) continue;
        
        const [translation, rotatedBeacons] = result;
        const [dx, dy, dz] = translation;
        
        for (const [x, y, z] of rotatedBeacons) {
            globalBeacons.add(`${x + dx},${y + dy},${z + dz}`);
        }
        
        globalScanners.push(translation);
        
        scanners.splice(i, 1);
        
        foundScanner = true;
        break;
    }
    
    if (!foundScanner) {
        // Couldn't find a scanner that matches
        console.log("what");
        exit(1);
    }
}

let currMax = -1;
for (let i = 0; i < globalScanners.length; i++) {
    const [x, y, z] = globalScanners[i];
    for (let j = 0; j < globalScanners.length; j++) {
        if (i === j) continue;
        
        const [dx, dy, dz] = globalScanners[j];
        
        const manhattanDistance = Math.abs(x - dx) + Math.abs(y - dy) + Math.abs(z - dz);
        if (manhattanDistance > currMax) {
            currMax = manhattanDistance;
        }
    }
}

console.log(currMax);