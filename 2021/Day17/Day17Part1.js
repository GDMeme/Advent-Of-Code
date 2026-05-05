const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const minY = parseInt(arr[0].split('=')[2].split('..')[0]);

// When the probe comes back down to y = 0, it has velocity -(initial vy)
// Next step: - vy - 1
// We want - vy - 1 = minY
// vy = - minY - 1
// Height reached with initial velocity vy: 1 + 2 + ... + vy
// (vy(vy + 1)) / 2
// ((-minY - 1)(-minY)) / 2

console.log((-minY - 1) * -minY / 2);