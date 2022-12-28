const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function checkPair(oldPair, newPair, counter, flag, newPairCounter) {
    const currentIndex = newPairCounter.findIndex(element => element.key === newPair);
    if (currentIndex === -1) {
        newPairCounter.push({key: newPair, value: counter});
    } else {
        newPairCounter[currentIndex].value += counter;
    }
    if (flag) {
        newPairCounter[newPairCounter.findIndex(element => element.key === oldPair)].value -= counter;
    }
    return newPairCounter;
}

let template = arr[0];

const pairInsertion = [];

for (let i = 2; i < arr.length; i++) {
    const [pair, insert] = arr[i].split(' -> ');
    pairInsertion.push({pair, insert});
}

let pairCounter = [];

for (let i = 0; i < template.length - 1; i++) {
    const pair = template.substring(i, i + 2);
    const currentIndex = pairCounter.findIndex(element => element.key === pair);
    if (currentIndex === -1) {
        pairCounter.push({key: pair, value: 1});
    } else {
        pairCounter[currentIndex].value++;
    }
}

for (let i = 0; i < 40; i++) { // 40 rounds
    let newPairCounter = cloneDeep(pairCounter);
    for (const item of pairCounter) {
        const currentKey = item.key;
        const currentValue = item.value;
        const letterToInsert = pairInsertion[pairInsertion.findIndex(element => element.pair === currentKey)].insert;
        const firstNewPair = currentKey[0] + letterToInsert;
        const secondNewPair = letterToInsert + currentKey[1];
        newPairCounter = checkPair(currentKey, firstNewPair, currentValue, false, newPairCounter);
        newPairCounter = checkPair(currentKey, secondNewPair, currentValue, true, newPairCounter);
    }
    pairCounter = cloneDeep(newPairCounter);
}

const letterCounter = [];
const letterSeen = [];

for (let i = 0; i < pairCounter.length; i++) {
    if (i === 0) {
        const firstLetter = pairCounter[i].key[0];
        let currentIndex = letterSeen.findIndex(element => element === firstLetter);
        if (currentIndex !== -1) {
            letterCounter[currentIndex] += pairCounter[i].value;
        } else {
            letterCounter.push(pairCounter[i].value);
            letterSeen.push(firstLetter);
        }
    } else {
        const secondLetter = pairCounter[i].key[1];
        currentIndex = letterSeen.findIndex(element => element === secondLetter);
        if (currentIndex !== -1) {
            letterCounter[currentIndex] += pairCounter[i].value;
        } else {
            letterCounter.push(pairCounter[i].value);
            letterSeen.push(secondLetter);
        }
    }
}

letterCounter.sort(function(a, b) {
    return a - b;
  });

console.log(letterCounter[letterCounter.length - 1] - letterCounter[0]);