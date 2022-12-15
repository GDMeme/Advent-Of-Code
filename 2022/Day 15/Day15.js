const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let mySet = new Set();    
let checkYValue = 2000000
for (let i = 0; i < arr.length; i++) {
    let splitInput = arr[i].split(' ');
    let currentSensorX = parseInt(splitInput[2].slice(2));
    let currentSensorY = parseInt(splitInput[3].slice(2));
    let closestBeaconX = parseInt(splitInput[8].slice(2));
    let closestBeaconY = parseInt(splitInput[9].slice(2));

    let distance = Math.abs(currentSensorX - closestBeaconX) + Math.abs(currentSensorY - closestBeaconY);
    let stepsToReach = Math.abs(checkYValue - currentSensorY);
    for (let i = 0; i < distance - stepsToReach + 1; i++) {
        mySet.add(currentSensorX + i);
        mySet.add(currentSensorX - i);
    }
}
for (let i = 0; i < arr.length; i++) {
    let splitInput = arr[i].split(' ');
    let closestBeaconY = parseInt(splitInput[9].slice(2));
    if (closestBeaconY === checkYValue) {
        let closestBeaconX = parseInt(splitInput[8].slice(2));
        mySet.delete(closestBeaconX);
    }
}
console.log(mySet.size);


// find distance to closest beacon (change in x + change in y);

// find direction that would go towards y = 2 million

// count how many steps in that direction you took until you reach y = 2 million (just use abs)

// distance you can go in both directions is length = distance - (# of steps u took to reach y = 2 million) edge case: can't actually reach y = 2 million?

// this line represents places where a beacon cannot exist

// add the x coordinates from this line to a set

// repeat

// delete all x values from the set that are coordinates of beacons/sensors that also lie on on y = 2 million (in this case there are no sensors, but there is a beacon)

// solution is set.size;