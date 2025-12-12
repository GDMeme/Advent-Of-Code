const { readFileSync } = require('fs');

const inputOutputMap = new Map();
readFileSync('./input.txt', 'utf-8').split(/\r?\n/).map(line => {
    const [input, outputs] = line.split(': ');
    inputOutputMap.set(input, outputs.split(' '));
});

// Observation: Directed acyclic graph, fft can go to dac but dac cannot go to fft
// So paths must be start -> fft -> dac -> out

function countPathsDacToOut(key, startKey) {
    if (key === 'out') {
        return 1;
    }
    
    let dacCount = 0;
    for (const output of inputOutputMap.get(key)) {
        dacCount += countPathsDacToOut(output);
    }
    
    dacCache.set(key, dacCount);
    return dacCount;
}

const fftCache = new Map();

function countPathsFftToDac(key) {
    if (fftCache.has(key)) {
        return fftCache.get(key);
    }
    
    if (key === 'dac') {
        return 1;;
    }

    if (key === 'out') {
        // Early return, cannot have passed through dac if reached here
        return 0;
    }

    let fftCount = 0;
    for (const output of inputOutputMap.get(key)) {
        fftCount += countPathsFftToDac(output);
    }

    fftCache.set(key, fftCount);
    return fftCount;
}

const svrCache = new Map();

function countPathsSvrToFft(key) {
    if (svrCache.has(key)) {
        return svrCache.get(key);
    }

    if (key === 'fft') {
        return 1;
    }

    if (key === 'dac' || key === 'out') {
        // Early return, cannot have passed through fft if reached here
        return 0;
    }

    let svrCount = 0;
    for (const output of inputOutputMap.get(key)) {
        svrCount += countPathsSvrToFft(output);
    }

    svrCache.set(key, svrCount);
    return svrCount;
}

const dacCache = new Map();

let dacCount = 0;
for (const key of inputOutputMap.get('dac')) {
    dacCount += countPathsDacToOut(key);
}

let fftCount = 0;
for (const key of inputOutputMap.get('fft')) {
    fftCount += countPathsFftToDac(key);
}

let svrCount = 0;
for (const key of inputOutputMap.get('svr')) {
    svrCount += countPathsSvrToFft(key);
}

console.log(svrCount * fftCount * dacCount);