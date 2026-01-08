const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

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
  
const BUTTON_PRESSES = 1000;
let numLowPulses = 0;
let numHighPulses = 0;
for (let i = 0; i < BUTTON_PRESSES; i++) {
    const pulseQueue = [{ from: "button", to: "broadcaster", signal: 0 }];
    while (pulseQueue.length) {
        const { from, to, signal } = pulseQueue.shift();
        if (signal === 0) {
            numLowPulses++;
        } else {
            numHighPulses++;
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

console.log("numLowPulses:", numLowPulses);
console.log("numHighPulses:", numHighPulses);
console.log(numHighPulses * numLowPulses);