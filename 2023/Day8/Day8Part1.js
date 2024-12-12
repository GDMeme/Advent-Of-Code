const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const inputs = arr[0];

let location, destination;

let locationMap = new Map();

for (let i = 2; i < arr.length; i++) { // hardcoded don't care
    [location, destination] = arr[i].split(" = ("); // not really "left" but temporary
    destination = destination.slice(0, -1);

    locationMap.set(location, destination);
}

let myLocation = "AAA";
let left, right;
let inputIndex = 0;
let steps = 0;

while (myLocation !== "ZZZ") {
    [left, right] = locationMap.get(myLocation).split(", ");
    myLocation = inputs[inputIndex] === "L" ? left : right;
    inputIndex++;
    steps++;
    if (inputIndex === inputs.length) {
        inputIndex = 0;
    }
}

console.log(steps)