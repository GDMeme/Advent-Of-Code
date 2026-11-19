
const { readFileSync } = require('fs');

const input = readFileSync('./input.txt', 'utf-8')
    .trim()
    .split(/\r?\n/);

// Split instructions into blocks, each beginning with inp
const blocks = [];
let block = [];

for (const line of input) {
    if (line.startsWith('inp')) {
        if (block.length) blocks.push(block);
        block = [];
    }

    block.push(line.split(' '));
}

if (block.length) blocks.push(block);

// Extract A, B, C from each block
const constants = blocks.map(block => ({
    A: Number(block[5][2]),
    B: Number(block[4][2]),
    C: Number(block[15][2])
}));

// Match push/pop operations
function findPairs(constants) {
    const stack = [];
    const pairs = [];

    for (let i = 0; i < constants.length; i++) {
        const { A, B, C } = constants[i];

        if (B === 1) {
            stack.push([i, C]);
        } else {
            const [previousIndex, previousC] = stack.pop();

            // digit[i] = digit[previousIndex] + previousC + A
            pairs.push([
                previousIndex,
                i,
                previousC + A
            ]);
        }
    }

    if (stack.length) {
        throw new Error('Unmatched push operations');
    }

    return pairs;
}

// Generate largest or smallest valid model number
function solve(pairs, largest) {
    const digits = Array(14).fill(0);

    for (const [a, b, offset] of pairs) {
        const start = largest ? 9 : 1;
        const end = largest ? 0 : 10;
        const step = largest ? -1 : 1;

        for (let d = start; d !== end; d += step) {
            const other = d + offset;

            if (other >= 1 && other <= 9) {
                digits[a] = d;
                digits[b] = other;
                break;
            }
        }
    }

    if (digits.some(d => d === 0)) {
        throw new Error('Could not find a valid model number');
    }

    return digits.join('');
}

// Original ALU interpreter for verification
function runALU(modelNumber) {
    const registers = { w: 0, x: 0, y: 0, z: 0 };
    let inputIndex = 0;

    for (const instruction of input) {
        const [op, a, b] = instruction.split(' ');

        if (op === 'inp') {
            registers[a] = Number(modelNumber[inputIndex++]);
            continue;
        }

        const value = registers[b] !== undefined
            ? registers[b]
            : Number(b);

        switch (op) {
            case 'add':
                registers[a] += value;
                break;

            case 'mul':
                registers[a] *= value;
                break;

            case 'div':
                registers[a] = Math.trunc(registers[a] / value);
                break;

            case 'mod':
                if (registers[a] < 0 || value <= 0) {
                    throw new Error('Invalid modulo operands');
                }
                registers[a] %= value;
                break;

            case 'eql':
                registers[a] = Number(registers[a] === value);
                break;
        }
    }

    return registers;
}

const pairs = findPairs(constants);

const part1 = solve(pairs, true);
const part2 = solve(pairs, false);

console.log('Part 1:', part1);
console.log('Part 2:', part2);

// Verify both answers using the original instructions
console.log('Part 1 registers:', runALU(part1));
console.log('Part 2 registers:', runALU(part2));
