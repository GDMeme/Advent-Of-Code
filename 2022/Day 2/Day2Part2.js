const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let opponentChoice = undefined;
let myChoice = undefined;
let myScore = 0;
for (let i = 0; i < arr.length; i++) {
    opponentChoice = arr[i].split(' ')[0];
    myChoice = arr[i].split(' ')[1];
    if (opponentChoice === 'A') {
        if (myChoice === 'X') {
            myScore += 3;
        } else if (myChoice === 'Y') {
            myScore += 4;
        } else if (myChoice === 'Z') {
            myScore += 8;
        }
    } else if (opponentChoice === 'B') {
        if (myChoice === 'X') {
            myScore += 1;
        } else if (myChoice === 'Y') {
            myScore += 5;
        } else if (myChoice === 'Z') {
            myScore += 9;
        }
    } else if (opponentChoice === 'C') {
        if (myChoice === 'X') {
            myScore += 2;
        } else if (myChoice === 'Y') {
            myScore += 6;
        } else if (myChoice === 'Z') {
            myScore += 7;
        }
    }
}
console.log('My score is:', myScore);