const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let currentIndex = 0;

// Don't need the input values for part 2
while (arr[currentIndex] !== "") {
    currentIndex++;
}

const maxZValue = currentIndex / 2;

currentIndex++;

// Set up gates
const gates = [];

for (let i = currentIndex; i < arr.length; i++) {
    const [left, output] = arr[i].split(" -> ");
       
    const [leftWire, operator, rightWire] = left.split(" ");
    gates.push({ leftWire, operator, rightWire, output });
}

const wiresToSwap = new Set();

// Ripple carry adder

/**
 * FULL ADDER
 *
 * A    XOR B    -> VAL0     <= FAGate0
 * A    AND B    -> VAL1     <= FAGate1
 * VAL0 AND CIN  -> VAL2     <= FAGate2
 * VAL0 XOR CIN  -> zxx      <= FAGate3
 * VAL1 OR  VAL2 -> COUT     <= FAGate4
 */

// * Note: Checking for x is enough; all gate inputs are of the form (x op y) or (non-x op non-y)

// FAGate0
const FAGates0s = gates.filter(gate => gate.leftWire.indexOf("x") === 0 || gate.rightWire.indexOf("x") === 0).filter(gate => gate.operator === "XOR");

for (const gate of FAGates0s) {
    const { leftWire, rightWire, output } = gate;
    
    // Must have x00 XOR y00 => z00
    if (leftWire === "x00" || rightWire === "x00") {
        if (output !== "z00") {
            wiresToSwap.add(output);
        }
        continue;
    } else if (output === "z00") {
        wiresToSwap.add(output);
    }
    
    // None of these should have z as an output (except z00)
    if (gate.output.indexOf("z") === 0) {
        wiresToSwap.add(output);
    }
}

// FAGate3
// XOR and no x's
// All should have an output of z
const FAGate3s = gates.filter(gate => gate.operator === "XOR").filter(gate => !(gate.leftWire.indexOf("x") === 0 || gate.rightWire.indexOf("x") === 0));

for (const gate of FAGate3s) {
    if (gate.output.indexOf("z") !== 0) {
        wiresToSwap.add(gate.output);
    }
}

const outputGates = gates.filter(gate => gate.output.indexOf("z") === 0);

for (const gate of outputGates) {
    // z${maxZValue} needs to be an output of an FAGate4 (OR) since it is the COUT (carry out)
    // Any other z output needs to be an output of an FAGate3 (XOR)
    if (gate.output === `z${maxZValue}`) {
        if (gate.operator !== "OR") {
            wiresToSwap.add(gate.output);
        }
        continue;
    } else if (gate.operator !== "XOR") {
        wiresToSwap.add(gate.output);
    }
}

// All FAGate0 outputs must be an input to an FAGate3
// Except an output of z00; this doesn't become an input to an FAGate3
const mismatches = [];
for (const gate of FAGates0s) {
    const { output } = gate;
    
    // If already need to swap or z00, skip
    if (wiresToSwap.has(output) || output === "z00") {
        continue;
    }
    
    // Check if it is not an input to an FAGate3
    if (FAGate3s.filter(gate => gate.leftWire === output || gate.rightWire === output).length === 0) {
        mismatches.push(gate);
        wiresToSwap.add(output);
    }
}

// Find the gate that the mismatched output should be swapped with
const FAGate4s = gates.filter(gate => gate.operator === "OR");
for (const gate of mismatches) {
    const { leftWire } = gate;
    
    // Idea: xn op yn => some FAGate3 that outputs zn
    const intendedOutput = `z${leftWire.slice(1)}`;
    
    // Look for the gate that has the intended output (should only be length 1)
    const intendedGate = FAGate3s.filter(gate => gate.output === intendedOutput)[0];
    
    // Get the output of an FAGate4 that has one of the intended gate's inputs as the output
    // (should only be length 1)
    const matchingGate = FAGate4s.filter(gate => intendedGate.leftWire === gate.output || intendedGate.rightWire === gate.output)
    const matchingGateOutput = matchingGate[0].output;

    // Pick the other one (not matchingGateOutput) cuz that's the one you wanna swap with
    // matchingGate is correct, but the other one needs to be swapped
    wiresToSwap.add(intendedGate.leftWire === matchingGateOutput ? intendedGate.rightWire : intendedGate.leftWire);
}

console.log(Array.from(wiresToSwap).sort().join(","));