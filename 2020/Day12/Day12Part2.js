const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let shipX = 0;
let shipY = 0;

let waypointX = 10;
let waypointY = 1; 

for (let i = 0; i < arr.length; i++) {
    const instruction = arr[i][0];
    const value = parseInt(arr[i].slice(1));
    switch (instruction) {
        case 'N':
            waypointY += value;
            break;
        case 'S':
            waypointY -= value;
            break;
        case 'E':
            waypointX += value;
            break;
        case 'W':
            waypointX -= value;
            break;
        case 'L':
            const distanceX = waypointX - shipX;
            const distanceY = waypointY - shipY;
            if (value === 90) {
                waypointX = shipX - distanceY;
                waypointY = shipY + distanceX;
            } else if (value === 180) {
                waypointX = shipX - distanceX;
                waypointY = shipY - distanceY;
            } else { // 270
                waypointX = shipX + distanceY;
                waypointY = shipY - distanceX;
                
            }
            break;
        case 'R':
            const distanceX2 = waypointX - shipX;
            const distanceY2 = waypointY - shipY;
            if (value === 90) {
                waypointX = shipX + distanceY2;
                waypointY = shipY - distanceX2;
            } else if (value === 180) {
                waypointX = shipX - distanceX2;
                waypointY = shipY - distanceY2;
            } else {
                waypointX = shipX - distanceY2;
                waypointY = shipY + distanceX2;
            }
            break;
        case 'F':
            const differenceX = waypointX - shipX;
            const differenceY = waypointY - shipY;
            shipX += value * (waypointX - shipX);
            shipY += value * (waypointY - shipY);
            waypointX = shipX + differenceX;
            waypointY = shipY + differenceY;
            break;
    }
}

console.log(Math.abs(shipX) + Math.abs(shipY));