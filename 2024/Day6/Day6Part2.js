const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

 // TODO: Optimize (only need to place extra wall at the spots the guard would originally pass through)

// 0 - up
// 1 - right
// 2 - down
// 3 - left
let guardDirection = 0;
let guardX;
let guardY;
let newGuardX;
let newGuardY;

let guardCoordinateAndDirection = new Set();

let result = 0;

for (let i = 0; i < arr.length; i++) {
    const guardIndex = arr[i].indexOf("^");
    if (guardIndex !== -1) {
        for (let j = 0; j < arr.length; j++) {
            for (let k = 0; k < arr[j].length; k++) {
                guardDirection = 0;
                guardCoordinateAndDirection.clear();
                const newArr = [...arr];
                
                // Skip existing walls
                if (newArr[j][k] === "#") {
                    continue;
                }
                
                newArr[j] = newArr[j].substring(0, k) + "#" + newArr[j].substring(k + 1);
                
                guardX = guardIndex;
                guardY = i;
                
                guardCoordinateAndDirection.add([guardX, guardY, guardDirection].join());
                while (true) {
                    if (guardDirection === 0) {
                        newGuardX = guardX;
                        newGuardY = guardY - 1;
                    } else if (guardDirection === 1) {
                        newGuardX = guardX + 1;
                        newGuardY = guardY;
                    } else if (guardDirection === 2) {
                        newGuardX = guardX;
                        newGuardY = guardY + 1;
                    } else {
                        newGuardX = guardX - 1;
                        newGuardY = guardY;
                    }
                    
                    // Check if out of bounds
                    if (newGuardY < 0 || newGuardY >= arr.length || newGuardX < 0 || newGuardX >= arr[0].length) {
                        break;
                    }
                    
                    if (newArr[newGuardY][newGuardX] === "#") {
                        guardDirection++;
                        if (guardDirection === 4) {
                            guardDirection = 0;
                        }
                        continue;
                    }
                    if (guardCoordinateAndDirection.has([newGuardX, newGuardY, guardDirection].join())) { // guard is in infinite loop
                        result++;
                        break;
                    }
                    guardCoordinateAndDirection.add([newGuardX, newGuardY, guardDirection].join());
                    
                    guardX = newGuardX;
                    guardY = newGuardY;
                    
                }
            }
        }
        break;
    }
}

console.log(result);