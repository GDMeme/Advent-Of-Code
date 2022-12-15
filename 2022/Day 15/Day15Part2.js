const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let breakBoolean = false;
let mySet = new Set(); 
let checkYValue = 0;
let maxSearch = 4000000;
while (breakBoolean === false) {
    for (let i = 0; i < arr.length; i++) {
        let splitInput = arr[i].split(' ');
        let currentSensorX = parseInt(splitInput[2].slice(2));
        let currentSensorY = parseInt(splitInput[3].slice(2));
        let closestBeaconX = parseInt(splitInput[8].slice(2));
        let closestBeaconY = parseInt(splitInput[9].slice(2));

        let distance = Math.abs(currentSensorX - closestBeaconX) + Math.abs(currentSensorY - closestBeaconY);
        let stepsToReach = Math.abs(checkYValue - currentSensorY);
        for (let i = 0; i < distance - stepsToReach + 1; i++) {
            if ((currentSensorX + i) >= 0 && ((currentSensorX + i) <= maxSearch)) {
                mySet.add(currentSensorX + i);
            }
            if ((currentSensorX - i) >= 0 && ((currentSensorX - i) <= maxSearch)) {
                mySet.add(currentSensorX - i);
            }
        }
    }
    if (checkYValue > maxSearch) {
        break;
    }
    if (mySet.size !== maxSearch + 1) {
        for (let i = 0; i < maxSearch + 1; i++) {
            if (!mySet.has(i)) {
                console.log('missing x value is:', i);
                console.log('missing y value is:', checkYValue);
                const solution = (4000000 * i) + checkYValue;
                console.log('ans is:', solution);
                breakBoolean = true;
                break;
            }
        }
    }
    checkYValue++;
    mySet.clear();

    // if (checkYValue % 50000 ===/who
    le.log('i am at', checkYValue);
    // }
}