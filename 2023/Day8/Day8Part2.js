const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

// * BRUTE FORCE TOO SLOW, DOESN'T WORK

const inputs = arr[0];

let location, destination;

let locationMap = new Map();
let myLocations = [];

for (let i = 2; i < arr.length; i++) { // hardcoded don't care
    [location, destination] = arr[i].split(" = ("); // not really "left" but temporary
    destination = destination.slice(0, -1);

    locationMap.set(location, destination);
    if (location[location.length - 1] === "A") {
        myLocations.push(location);
    }
}

let left, right;
let inputIndex = 0;
let steps = 0;

while (!myLocations.every(e => e[e.length - 1] === "Z")) {
    for (let i = 0; i < myLocations.length; i++) {
        [left, right] = locationMap.get(myLocations[i]).split(", ");
        myLocations[i] = inputs[inputIndex] === "L" ? left : right;
    }
    inputIndex++;
    steps++;
    if (inputIndex === inputs.length) {
        inputIndex = 0;
    }
    if (steps % 1000000000 === 0) {
        console.log(steps);
    }
}

console.log(steps)