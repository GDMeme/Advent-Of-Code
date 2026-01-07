const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

function giveMonkeyStartingItems (index, monkeyNumber) {
    worryLevel[monkeyNumber] = arr[index].split(' ').slice(4);
    for (let j = 0; j < worryLevel[monkeyNumber].length; j++) { // remove the trailing comma
        if (worryLevel[monkeyNumber][j][2] === ',') { // only 2 digit numbers
            worryLevel[monkeyNumber][j] = worryLevel[monkeyNumber][j].slice(0, -1);
        }
        worryLevel[monkeyNumber][j] = parseInt(worryLevel[monkeyNumber][j]);
    }
}

let arr = syncReadFile('./input.txt');
let worryLevel = [[], [], [], [] ,[] ,[], [], []];
let counter = 0;
for (let i = 0; i < arr.length; i++) { // give starting items to monkeys
    if (arr[i][2] === 'S') {
        giveMonkeyStartingItems(i, counter);
        counter++;
    }
}

inspectCounter = [0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < 20; i++) { // 20 rounds
    for (let j = 0; j < 8; j++) { // 8 monkeys
        const numberOfItems = worryLevel[j].length;
        for (let k = 0; k < numberOfItems; k++) { // each monkey's item
            if (j === 0) { // monkey 0
                let currentValue = worryLevel[j][k];
                currentValue *= 7; // hardcoded for now
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 13 === 0) { // also hardcoded for now
                    worryLevel[1].push(currentValue);
                } else {
                    worryLevel[3].push(currentValue);
                }
                inspectCounter[0]++;
            } else if (j === 1) {
                let currentValue = worryLevel[j][k];
                currentValue += 7;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 19 === 0) {
                    worryLevel[2].push(currentValue);
                } else {
                    worryLevel[7].push(currentValue);
                }
                inspectCounter[1]++;
            } else if (j === 2) {
                let currentValue = worryLevel[j][k];
                currentValue *= 3;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 5 === 0) {
                    worryLevel[5].push(currentValue);
                } else {
                    worryLevel[7].push(currentValue);
                }
                inspectCounter[2]++;
            } else if (j === 3) {
                let currentValue = worryLevel[j][k];
                currentValue += 3;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 2 === 0) {
                    worryLevel[1].push(currentValue);
                } else {
                    worryLevel[2].push(currentValue);
                }
                inspectCounter[3]++;
            } else if (j === 4) {
                let currentValue = worryLevel[j][k];
                currentValue *= currentValue;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 17 === 0) {
                    worryLevel[6].push(currentValue);
                } else {
                    worryLevel[0].push(currentValue);
                }
                inspectCounter[4]++;
            } else if (j === 5) {
                let currentValue = worryLevel[j][k];
                currentValue += 8;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 11 === 0) {
                    worryLevel[4].push(currentValue);
                } else {
                    worryLevel[6].push(currentValue);
                }
                inspectCounter[5]++;
            } else if (j === 6) {
                let currentValue = worryLevel[j][k];
                currentValue += 2;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 7 === 0) {
                    worryLevel[3].push(currentValue);
                } else {
                    worryLevel[0].push(currentValue);
                }
                inspectCounter[6]++;
            } else if (j === 7) {
                let currentValue = worryLevel[j][k];
                currentValue += 4;
                currentValue = Math.floor(currentValue / 3);
                if (currentValue % 3 === 0) {
                    worryLevel[4].push(currentValue);
                } else {
                    worryLevel[5].push(currentValue);
                }
                inspectCounter[7]++;
            }
            if (k === numberOfItems - 1) {
                worryLevel[j] = [];
            }
        }
    }
}
// find max and secondMax in inspectCounter
let max = 0;
let secondMax = 0;
for (let i = 0; i < inspectCounter.length; i++) {
    if (inspectCounter[i] > secondMax) {
        if (inspectCounter[i] > max) {
            secondMax = max;
            max = inspectCounter[i];
        } else {
            secondMax = inspectCounter[i];
        }
    }
}
console.log(max * secondMax);