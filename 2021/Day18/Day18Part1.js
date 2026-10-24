const { readFileSync } = require('fs');
const { exit } = require('process');

const arr = readFileSync('./input.txt', 'utf-8').trim().split(/\r?\n/);

function findLeftNumIndex(expr, index) {
    for (let i = index; i >= 0; i--) {
        if (/\d/.test(expr[i])) { // Find the full number, could be 2 digits
            let end = i + 1;

            while (i >= 0 && /\d/.test(expr[i])) {
                i--;
            }

            return [i + 1, parseInt(expr.slice(i + 1, end))];
        }
    }

    return [-1, null];
}

function findRightNumIndex(expr, index) {
    for (let i = index; i < expr.length; i++) {
        if (/\d/.test(expr[i])) { // Find the full number, could be 2 digits
            let start = i;

            while (i < expr.length && /\d/.test(expr[i])) {
                i++;
            }

            return [start, parseInt(expr.slice(start, i))];
        }
    }

    return [-1, null];
}

function explodeIfPossible(expr) {
    let startExplodeIndex = -1;
    let numOpen = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '[') {
            numOpen++;
        } else if (expr[i] === ']') {
            numOpen--;
        }

        if (numOpen === 5 && expr[i] === '[') {
            startExplodeIndex = i;
        }

        if (numOpen === 4 && startExplodeIndex !== -1 && expr[i] === ']') {
            let currExpr = expr.slice(startExplodeIndex, i + 1);
            const [left, right] = findLeftAndRight(currExpr); // Guaranteed to be numbers

            const [leftIndex, leftNum] = findLeftNumIndex(expr, startExplodeIndex - 1);
            const [rightIndex, rightNum] = findRightNumIndex(expr, i + 1);

            // Update right number first so left indices stay unchanged
            if (rightIndex !== -1) {
                const newNum = rightNum + Number(right);

                expr = expr.slice(0, rightIndex) + newNum + expr.slice(rightIndex + String(rightNum).length);
            }

            // Replace exploded pair with 0
            expr = expr.slice(0, startExplodeIndex) + '0' + expr.slice(i + 1);

            // Update left number
            if (leftIndex !== -1) {
                const newNum = leftNum + Number(left);

                expr = expr.slice(0, leftIndex) + newNum + expr.slice(leftIndex + String(leftNum).length);
            }

            return [expr, true];
        }
    }

    return [expr, false];
}

function splitIfPossible(expr) {
    for (let i = 0; i < expr.length; i++) {
        if (/\d/.test(expr[i])) {
            let start = i;

            while (i < expr.length && /\d/.test(expr[i])) {
                i++;
            }

            const num = parseInt(expr.slice(start, i));

            if (num >= 10) {
                const left = Math.floor(num / 2);
                const right = Math.ceil(num / 2);

                expr = expr.slice(0, start) + `[${left},${right}]` + expr.slice(i);

                return [expr, true];
            }

            i--;
        }
    }

    return [expr, false];
}

function magnitude(expr) {
    if (!isNaN(expr)) { // Edge case of only 1 number
        return parseInt(expr);
    }

    const [left, right] = findLeftAndRight(expr);

    return (3 * magnitude(left)) + (2 * magnitude(right));
}

function findLeftAndRight(expr) {
    // Edge case of only one pair
    if (expr.indexOf(',') !== -1 && expr.indexOf(',') === expr.lastIndexOf(',')) {
        const commaIndex = expr.indexOf(',');
        return [
            expr.slice(1, commaIndex),
            expr.slice(commaIndex + 1, expr.length - 1)
        ];
    }

    let numOpen = 0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i] === '[') {
            numOpen++;
        } else if (expr[i] === ']') {
            numOpen--;
        } else if (expr[i] === ',' && numOpen === 1) {
            return [
                expr.slice(1, i),
                expr.slice(i + 1, expr.length - 1)
            ];
        }
    }

    console.log("Illegal expression? ", expr);
    exit(1);
}

let currExpr = arr[0];

for (let i = 1; i < arr.length; i++) {
    currExpr = `[${currExpr},${arr[i]}]`;

    // Keep reducing until neither explosion nor split is possible
    while (true) {
        const [newExpr, exploded] = explodeIfPossible(currExpr);

        if (exploded) {
            currExpr = newExpr;
            continue;
        }

        const [splitExpr, split] = splitIfPossible(currExpr);

        if (split) {
            currExpr = splitExpr;
            continue;
        }

        break;
    }
}

console.log(magnitude(currExpr));