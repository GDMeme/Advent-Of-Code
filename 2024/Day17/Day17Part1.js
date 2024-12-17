const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function getComboOperand(literalOperand) {
    if (literalOperand <= 3) {
        return literalOperand;
    } else if (literalOperand === 4) {
        return registerA;
    } else if (literalOperand === 5) {
        return registerB;
    } else if (literalOperand === 6) {
        return registerC;
    } else {
        console.log("how??");
    }
}

let registerA = parseInt(arr[0].split(": ")[1]);
let registerB = parseInt(arr[1].split(": ")[1]);
let registerC = parseInt(arr[2].split(": ")[1]);

const program = arr[4].split(": ")[1].split(',').map(e => parseInt(e));

const outArray = [];

for (let i = 0; i < program.length; i += 2) {
    const opcode = program[i];
    const literalOperand = program[i + 1];
    
    if (opcode === 0) { // adv
        registerA = Math.floor(registerA / (2 ** getComboOperand(literalOperand)));
    } else if (opcode === 1) { // bxl
        registerB = registerB ^ literalOperand;
    } else if (opcode === 2) { // bst
        registerB = getComboOperand(literalOperand) % 8;
    } else if (opcode === 3) { // jnz
        if (registerA === 0) {
            continue;
        }
        
        i = literalOperand - 2;
    } else if (opcode === 4) { // bxc
        registerB = registerB ^ registerC;
    } else if (opcode === 5) { // out        
        outArray.push(getComboOperand(literalOperand) % 8);
    } else if (opcode === 6) { // bdv
        registerB = Math.floor(registerA / (2 ** getComboOperand(literalOperand)));
    } else if (opcode === 7) { // cdv
        registerC = Math.floor(registerA / (2 ** getComboOperand(literalOperand)));
    } else {
        console.log("how did you get here?");
    }
}

console.log(outArray.join());