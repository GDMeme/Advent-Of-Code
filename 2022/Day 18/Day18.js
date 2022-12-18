const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let sidesNotConnectedCounter = 0;

for (let i = 0; i < arr.length; i++) {
    let [currentX, currentY, currentZ] = arr[i].split(',');
    let sidesNotConnected = 6;
    for (let j = 0; j < arr.length; j++) {
        if (j === i) {
            continue;
        } else {
            let [nextX, nextY, nextZ] = arr[j].split(',');
            if (Math.abs(currentX - nextX) === 1 && currentY === nextY && currentZ === nextZ) {
                sidesNotConnected--;
            } else if (currentX === nextX && Math.abs(currentY - nextY) === 1 && currentZ === nextZ) {
                sidesNotConnected--;
            } else if (currentX === nextX && currentY === nextY && Math.abs(currentZ - nextZ) === 1) {
                sidesNotConnected--;
            }
        }
    }
    sidesNotConnectedCounter += sidesNotConnected;
}

console.log(sidesNotConnectedCounter);