const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// store coordinate points
let maxY = 0; // check for first line y value being the biggest
let wallCoordinates = new Set();
for (let i = 0; i < arr.length; i++) {
    let newArray = arr[i].split(' -> ');
    for (let j = 0; j < newArray.length - 1; j++) { // since comparing two coordinate points
        const [currentXValue, currentYValue] = newArray[j].split(',').map(x => parseInt(x));
        const [nextXValue, nextYValue] = newArray[j + 1].split(',').map(x => parseInt(x));
        if (currentXValue === nextXValue) { // x values are the same, y values change
            let currentBigger = false; // assume nextYValue is bigger
            if (currentYValue > nextYValue) {
                currentBigger = true;
            }
            for (let k = 0; k < Math.abs(currentYValue - nextYValue) + 1; k++) {
                if (currentBigger) {
                    wallCoordinates.add(currentXValue + ',' + (nextYValue + k));
                } else {
                    wallCoordinates.add(currentXValue + ',' + (currentYValue + k));
                }
            }
        } else { //  y values are the same, x values change
            let currentBigger = false; // assume nextXValue is bigger
            if (currentXValue > nextXValue) {
                currentBigger = true;
            }
            for (let k = 0; k < Math.abs(currentXValue - nextXValue) + 1; k++) {
                if (currentBigger) {
                    wallCoordinates.add((nextXValue + k) + ',' + nextYValue);
                } else {
                    wallCoordinates.add((currentXValue + k) + ',' + nextYValue);
                }
            }
        }
        if (nextYValue > maxY) {
            maxY = nextYValue;
        }
    }
}

let solved = false;
let sandCounter = 0;
while (!solved) {
    let hitBottom = false;
    let currentX = 500;
    let currentY = 0;
    while (!hitBottom) {
        if (!wallCoordinates.has(currentX + ',' + (currentY + 1))) {
            currentY++;
            if (currentY > maxY) {
                solved = true;
                break;
            }
        } else if (!wallCoordinates.has((currentX - 1) + ',' + (currentY + 1))) {
            currentX--;
            currentY++;
        } else if (!wallCoordinates.has((currentX + 1) + ',' + (currentY + 1))) {
            currentX++;
            currentY++;
        } else {
            wallCoordinates.add(currentX + ',' + currentY);
            hitBottom = true;
            sandCounter++;
        }
    }
}
console.log('# of sand:', sandCounter);