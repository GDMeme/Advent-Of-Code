const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

var startTime = performance.now()

let maxSearch = 4000000;

// get outer perimeter of all the scanners, check the value

// loop over all scanners and beacons, see if any of them cover that spot

// if none of them cover, break

let found = false;

for (let i = 0; i < arr.length; i++) {
    console.log('i is:', i);
    let splitInput = arr[i].split(' ');
    let currentSensorX = parseInt(splitInput[2].slice(2));
    let currentSensorY = parseInt(splitInput[3].slice(2));
    let closestBeaconX = parseInt(splitInput[8].slice(2));
    let closestBeaconY = parseInt(splitInput[9].slice(2));

    let radius = Math.abs(currentSensorX - closestBeaconX) + Math.abs(currentSensorY - closestBeaconY);
    for (let j = 0; j < radius; j++) { // go bottom left
        if (!checkSpot(currentSensorX + radius + 1 - j, currentSensorY + j, i)) {
            found = true;
            break;
        }
    }
    if (found) {
        break;
    }
    for (let j = 0; j < radius; j++) { // go top left
        if (!checkSpot(currentSensorX - j, currentSensorY + radius + 1 - j, i)) {
            found = true;
            break;
        }
    }
    if (found) {
        break;
    }
    for (let j = 0; j < radius; j++) { // go top right
        if (!checkSpot(currentSensorX - radius - 1 + j, currentSensorY - j, i)) {
            found = true;
            break;
        }
    }
    if (found) {
        break;
    }
    for (let j = 0; j < radius; j++) { // go bottom right
        if (!checkSpot(currentSensorX + j, currentSensorY - radius - 1 + j, i)) {
            found = true;
            break;
        }
    }
    if (found) {
        break;
    }
}

function checkSpot (xValue, yValue, index) {
    if (!(xValue >= 0 && xValue <= maxSearch && yValue >= 0 && yValue <= maxSearch)) {
        return true;
    }
    for (let i = 0; i < arr.length; i++) {
        if (i === index){
            continue;
        }
        let splitInput = arr[i].split(' ');
        let currentSensorX = parseInt(splitInput[2].slice(2));
        let currentSensorY = parseInt(splitInput[3].slice(2));
        let closestBeaconX = parseInt(splitInput[8].slice(2));
        let closestBeaconY = parseInt(splitInput[9].slice(2));

        let distance = Math.abs(currentSensorX - closestBeaconX) + Math.abs(currentSensorY - closestBeaconY);
        let stepsToReach = Math.abs(yValue - currentSensorY);
        let oneWayHorizontalLength = distance - stepsToReach;
        if ((xValue >= currentSensorX - oneWayHorizontalLength) && (xValue <= currentSensorX + oneWayHorizontalLength)) {
            return true;
        }
    }
    console.log('x is:', xValue, 'y is:', yValue);
    console.log('solution is:', 4000000 * xValue + yValue);
    var endTime = performance.now()
    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)
    return false;
} 