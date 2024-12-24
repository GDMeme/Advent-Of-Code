const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let currentIndex = 0;

const wireToValue = new Map();

while (arr[currentIndex] !== "") {
    const [wire, value] = arr[currentIndex].split(": ");
    wireToValue.set(wire, parseInt(value));
    currentIndex++;
}

currentIndex++;

let somethingChanged = true;
while (somethingChanged) {
    somethingChanged = false;
    for (let i = currentIndex; i < arr.length; i++) {
        const [left, output] = arr[i].split(" -> ");
        if (wireToValue.has(output)) {
            continue;
        }
        
        const [leftWire, operator, rightWire] = left.split(" ");
        
        if (wireToValue.has(leftWire) && wireToValue.has(rightWire)) {
            somethingChanged = true;
            let outputValue;
            if (operator === "OR") {
                outputValue = wireToValue.get(leftWire) || wireToValue.get(rightWire);
            } else if (operator === "AND") {
                outputValue = wireToValue.get(leftWire) && wireToValue.get(rightWire);
            } else if (operator == "XOR") {
                outputValue = wireToValue.get(leftWire) ^ wireToValue.get(rightWire);
            } else {
                console.log("how??");
                console.log("operator was: ", operator);
                return;
            }
            wireToValue.set(output, outputValue);
        }
    }
}

console.log(wireToValue);

let counter = 0;

let result = "";
while (wireToValue.has(`z${counter < 10 ? `0${counter}` : counter}`)) {
    result = wireToValue.get(`z${counter < 10 ? `0${counter}` : counter}`) + result;
    counter++;
}

console.log(parseInt(result, 2));