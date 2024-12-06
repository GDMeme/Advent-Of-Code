const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// 0 - up
// 1 - right
// 2 - down
// 3 - left
let guardDirection = 0;
let guardX;
let guardY;
let newGuardX;
let newGuardY;

let guardCoordinates = new Set();

for (let i = 0; i < arr.length; i++) {
    const guardIndex = arr[i].indexOf("^");
    if (guardIndex !== -1) {
        guardX = guardIndex;
        guardY = i;
        guardCoordinates.add([guardX, guardY].join());
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
            
            if (arr[newGuardY][newGuardX] === "#") {
                guardDirection++;
                if (guardDirection === 4) {
                    guardDirection = 0;
                }
                continue;
            }

            guardCoordinates.add([newGuardX, newGuardY].join());
            
            guardX = newGuardX;
            guardY = newGuardY;
            
        }
        break;
    }
}

console.log(guardCoordinates.size);