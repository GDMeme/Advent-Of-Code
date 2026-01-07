const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let currentIndex = 0;

const ruleMap = new Map();

while (arr[currentIndex] !== '') {
    let [ruleNumber, nextString] = arr[currentIndex].split(': ');
    ruleMap.set(ruleNumber, nextString);
    currentIndex++;
}

const solvedSet = new Set();

while (solvedSet.size !== ruleMap.size) {
    for (const [key, value] of ruleMap) { // make value a set of all possible values for that key
        solvedSet.clear();
        if (value.includes('"')) {
            solvedSet.add(key);
        }
    }
    for (const [key, value] of ruleMap) {
        if (value.includes('|')) {
            const [firstCombo, secondCombo] = value.split(' | ');
            let [firstComboFirstNumber, firstComboSecondNumber] = firstCombo.split(' ');
            let [secondComboFirstNumber, secondComboSecondNumber] = secondCombo.split(' ');
            if (solvedSet.includes(firstComboFirstNumber) && solvedSet.includes(firstComboSecondNumber) && solvedSet.includes(secondComboFirstNumber) && solvedSet.includes(secondComboSecondNumber)) {
                ruleMap.add(key, )
            }
        }
    }
}
