const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

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

const inputOutputs = new Map();
const outputInputs = new Map();
const conjunctions = [];
for (const line of arr) {
    const [input, outputs] = line.split(' -> ');
    
    if (input === "broadcaster") {
        inputOutputs.set('broadcaster', { outputs: outputs.split(', '), type: 'broadcaster' });
        continue;
    }
    
    const isFlipFlop = input[0] === '%';
    if (isFlipFlop) { // Deal with conjunctions later
        const currentState = 0;
        inputOutputs.set(input.slice(1), { outputs: outputs.split(', '), type: "flipflop", currentState });
    } else {
        // Need all the inputs to each conjunction before inserting into inputOutputs
        conjunctions.push({ input: input.slice(1), outputs: outputs.split(', ') });
    }
    
    for (const output of outputs.split(', ')) {
        if (!outputInputs.has(output)) {
            outputInputs.set(output, [input.slice(1)]);
        } else {
            outputInputs.set(output, outputInputs.get(output).concat([input.slice(1)]));
        }
    }
}

for (const conjunction of conjunctions) {
    const inputs = new Map();
    for (const input of outputInputs.get(conjunction.input)) {
        inputs.set(input, 0);
    }
    inputOutputs.set(conjunction.input, { outputs: conjunction.outputs, type: "conjunction", inputs });
}

const finalConj = outputInputs.get("rx")[0];
const cycleSeen = new Map(); // input -> button press
for (const input of inputOutputs.get(finalConj).inputs.keys()) {
    cycleSeen.set(input, null);
}
  
let numButtonPresses = 0;
while ([...cycleSeen.values()].some(v => v === null)) {
    numButtonPresses++;
    const pulseQueue = [{ from: "button", to: "broadcaster", signal: 0 }];
    while (pulseQueue.length) {
        const { from, to, signal } = pulseQueue.shift();
        
        if (to === finalConj && signal === 1 && cycleSeen.get(from) === null) {
            cycleSeen.set(from, numButtonPresses);
        }
        
        const module = inputOutputs.get(to);
        if (!module) { // rx for part 2 breaks without this
            continue;
        }
        
        if (module.type === "broadcaster") {
            for (const output of module.outputs) {
                pulseQueue.push({ from: to, to: output, signal }); // Send the same pulse (but its always low)
            }
        } else if (module.type === "flipflop" && signal === 0) {
            module.currentState = 1 - module.currentState;
            for (const output of module.outputs) {
                pulseQueue.push({ from: to, to: output, signal: module.currentState });
            }
        } else if (module.type === "conjunction") {
            module.inputs.set(from, signal);
            const allHigh = Array.from(module.inputs.values()).every(v => v === 1);
            for (const output of module.outputs) {
                pulseQueue.push({ from: to, to: output, signal: allHigh ? 0 : 1 });
            }
        }
    }
}

let ans = 1;
for (const v of cycleSeen.values()) {
    ans = lcm(ans, v);
}

console.log(ans);