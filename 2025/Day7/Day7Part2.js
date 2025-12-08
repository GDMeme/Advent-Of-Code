const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const startPosition = arr[0].indexOf('S');
const rows = arr.length;
const cols = arr[0].length;

// Build splitter indices per row
const splitterIndicesPerRow = [];
for (let i = 0; i < rows; i++) {
    splitterIndicesPerRow.push(new Set());
    for (let j = 0; j < cols; j++) {
        if (arr[i][j] === '^') {
            splitterIndicesPerRow[i].add(j);
        }
    }
}

const cache = new Map();

// DFS
function countPaths(row, col) {
    const key = row * cols + col; // Unique key for (row, col)
    if (cache.has(key)) {
        return cache.get(key);
    }
        
    if (row === rows - 1) {
        return 1;
    }

    const splitterIndices = splitterIndicesPerRow[row];
    let total;
    if (splitterIndices.has(col)) {
        total = countPaths(row + 1, col - 1) + countPaths(row + 1, col + 1);
    } else {
        total = countPaths(row + 1, col);
    }
    cache.set(key, total);
    return total;
}

const ans = countPaths(0, startPosition);
console.log(ans);