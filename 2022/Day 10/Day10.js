const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

function checkCheckpoint (repeat) {
    currentCycle++;
    if (currentCycle % 40 === 20) {
        signalStrength += (registerValue * currentCycle);
    }
    if (repeat) {
        checkCheckpoint(false);
    }
}

let arr = syncReadFile('./input.txt');
let currentCycle = 0;
let registerValue = 1;
let signalStrength = 0;
for (let i = 0; i < arr.length; i++) {
    const [cmd, val] = arr[i].split(' ');
    if (cmd === 'addx') {
        checkCheckpoint(true);
        registerValue += parseInt(val);
    } else { // noop
        checkCheckpoint(false);
    }
}
console.log('Signal strength is:', signalStrength);