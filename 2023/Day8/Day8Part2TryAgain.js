const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const inputs = arr[0];

let location, destinations;

const pathMap = new Map();
const startingLocations = [];

for (let i = 2; i < arr.length; i++) {
    [location, destinations] = arr[i].split(" = (");
    destinations = destinations.slice(0, -1);

    pathMap.set(location, destinations);
    if (location[location.length - 1] === "A") {
        startingLocations.push(location);
    }
}

let inputIndex = 0;
let steps = 0;

const distances = [];
const indicesToRemove = [];

const newStartingLocations = [...startingLocations];

while (distances.length !== startingLocations.length) {
    for (let i = 0; i < newStartingLocations.length; i++) {
        const [left, right] = pathMap.get(newStartingLocations[i]).split(", ");
        newStartingLocations[i] = inputs[inputIndex] === "L" ? left : right;

        if (newStartingLocations[i][newStartingLocations[i].length - 1] === "Z") {
            distances.push(steps + 1);
            indicesToRemove.push(i);
        }
    }

    for (let i = indicesToRemove.length - 1; i >= 0; i--) {
        newStartingLocations.splice(indicesToRemove[i], 1);
    }
    indicesToRemove.length = 0;

    inputIndex++;
    steps++;

    if (inputIndex === inputs.length) {
        inputIndex = 0;
    }
}

// Find LCM of distances

// Euclidean Algorithm
function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

// Cool LCM formula
function lcm(a, b) {
    return Math.abs(a * b) / gcd(a, b);
}


console.log(distances.reduce((acc, num) => lcm(acc, num)));