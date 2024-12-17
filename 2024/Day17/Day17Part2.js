const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function doProgram(A) {
    let registerA = A;
    let registerB = BigInt(0);
    let registerC = BigInt(0);
    
    // So registerA, registerB, registerC are defined
    let getComboOperand = (literalOperand) => {
        if (literalOperand <= 3n) {
            return literalOperand;
        } else if (literalOperand === 4n) {
            return registerA;
        } else if (literalOperand === 5n) {
            return registerB;
        } else if (literalOperand === 6n) {
            return registerC;
        } else {
            console.log("how??");
            console.log("literalOperand: ", literalOperand);
            exit(0);
        }
    }
    
    const outArray = [];
    
    for (let i = 0; i < program.length; i += 2) {
        const opcode = program[i];
        const literalOperand = program[i + 1];
        
        if (opcode === 0n) { // adv
            registerA = registerA >> getComboOperand(literalOperand);
        } else if (opcode === 1n) { // bxl
            registerB = registerB ^ literalOperand;
        } else if (opcode === 2n) { // bst
            registerB = getComboOperand(literalOperand) % 8n;
        } else if (opcode === 3n) { // jnz
            if (registerA === 0n) {
                continue;
            }
            
            i = Number(literalOperand) - 2; // Fine cuz literalOperand is small
        } else if (opcode === 4n) { // bxc
            registerB = registerB ^ registerC;
        } else if (opcode === 5n) { // out        
            outArray.push(getComboOperand(literalOperand) % 8n);
        } else if (opcode === 6n) { // bdv
            registerB = A >> getComboOperand(literalOperand);
        } else if (opcode === 7n) { // cdv
            registerC = A >> getComboOperand(literalOperand)
        } else {
            console.log("how did you get here?");
            console.log("opcode: ", opcode);
            exit(0);
        }
    }
    return outArray;
}

function check (currentIndex, currentNumber) {
    if (currentIndex === 0) {
        if (currentNumber < minA) {
            minA = currentNumber;
        }
        return;
    }
    
    // Start from end of program
    // DFS to find matching digit, multiply by 8 to shift 3 bits
    for (let i = 0; i < 8; i++) {
        if (doProgram(8n * currentNumber + BigInt(i))[0] === program[currentIndex - 1]) {
            check(currentIndex - 1, BigInt(i) + 8n * currentNumber);
        }
    }
}

const program = arr[4].split(": ")[1].split(',').map(BigInt);

// Surprisingly big enough
let minA = Number.MAX_SAFE_INTEGER;

check(program.length, 0n);

// To get rid of trailing n from BigInt
console.log(minA.toString());

