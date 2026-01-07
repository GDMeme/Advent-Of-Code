const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let sidesNotConnectedCounter = 0;

    // part 1 code
    for (let i = 0; i < arr.length; i++) { // do part 1 on the regular input
        let [currentX, currentY, currentZ] = arr[i].split(',').map(number => parseInt(number));
        let sidesNotConnected = 6;
        let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
        for (const [x,y,z] of directionArray) {
            const newCoordinate = [currentX + x, currentY + y, currentZ + z];
            if (arr.includes(newCoordinate.join())) {
                sidesNotConnected--;
            }
        }
        sidesNotConnectedCounter += sidesNotConnected;
    }

console.log(sidesNotConnectedCounter);