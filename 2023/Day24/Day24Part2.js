const { readFileSync } = require('fs');

const lines = readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/);

const hail = lines.map(line => {
    const [p, v] = line.split(' @ ');
    const [x, y, z] = p.split(', ').map(BigInt);
    const [vx, vy, vz] = v.split(', ').map(BigInt);
    return { x, y, z, vx, vy, vz };
});

function gcd(a, b) {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

// I was getting annoying off by 1 errors with floating point arithmetic
// By representing as fractions, never lose precision
// But that means I need to use BigInt since the numerators could be massive
function frac(num, den = 1n) {
    if (den < 0n) {
        num = -num;
        den = -den;
    }
    const g = gcd(num, den);
    return { num: num / g, den: den / g };
}

function add(a, b) {
    return frac(a.num * b.den + b.num * a.den, a.den * b.den);
}

function sub(a, b) {
    return frac(a.num * b.den - b.num * a.den, a.den * b.den);
}

function mul(a, b) {
    return frac(a.num * b.num, a.den * b.den);
}

function div(a, b) {
    return frac(a.num * b.den, a.den * b.num);
}

function isZero(a) {
    return a.num === 0n;
}

/*
Unknowns:
[x, y, z, vx, vy, vz]
*/

const equations = [];

function addEquations(a, b) {
    // XY
    equations.push([
        frac(a.vy - b.vy),
        frac(b.vx - a.vx),
        frac(0n),
        frac(b.y - a.y),
        frac(a.x - b.x),
        frac(0n),
        frac(
            a.x * a.vy - a.y * a.vx -
            (b.x * b.vy - b.y * b.vx)
        )
    ]);

    // XZ
    equations.push([
        frac(a.vz - b.vz),
        frac(0n),
        frac(b.vx - a.vx),
        frac(b.z - a.z),
        frac(0n),
        frac(a.x - b.x),
        frac(
            a.x * a.vz - a.z * a.vx -
            (b.x * b.vz - b.z * b.vx)
        )
    ]);

    // YZ
    equations.push([
        frac(0n),
        frac(a.vz - b.vz),
        frac(b.vy - a.vy),
        frac(0n),
        frac(b.z - a.z),
        frac(a.y - b.y),
        frac(
            a.y * a.vz - a.z * a.vy -
            (b.y * b.vz - b.z * b.vy)
        )
    ]);
}

// Only need 3 hailstones to determine a unique rock position and velocity
// Each "addEquations" generates 3 equations, there are 6 unknowns, so 2 "addEquations" = 6 equations and 6 unknowns
addEquations(hail[0], hail[1]);
addEquations(hail[0], hail[2]);

function solveLinearSystem(matrix) {
    const vars = 6;

    // Eliminate one variable at a time from all rows (the col-th variable)
    for (let col = 0; col < vars; col++) {
        
        // Find pivot (non-zero entry in current column)
        let pivot = col;
        while (pivot < vars && isZero(matrix[pivot][col])) {
            pivot++;
        }

        // Swap current row with pivot row
        if (pivot !== col) {
            [matrix[col], matrix[pivot]] = [matrix[pivot], matrix[col]];
        }

        // Normalize pivot row
        const divv = matrix[col][col];
        for (let c = col; c <= vars; c++) {
            matrix[col][c] = div(matrix[col][c], divv);
        }

        // Eliminate current column from all other rows
        for (let r = 0; r < vars; r++) {
            if (r === col) {
                continue;
            }
            const factor = matrix[r][col];
            for (let c = col; c <= vars; c++) {
                matrix[r][c] = sub(
                    matrix[r][c],
                    mul(factor, matrix[col][c])
                );
            }
        }
    }

    return matrix.map(row => row[vars]);
}

const solution = solveLinearSystem(equations);
const [x, y, z] = solution;

const answer = x.num + y.num + z.num;
console.log(answer.toString());