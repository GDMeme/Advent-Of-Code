const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

const spokenNumberArray = [];

for (const elem of arr) {
    spokenNumberArray.push(elem);
}

while (spokenNumberArray.length !== 2020) {
    const lastNumber = spokenNumberArray[spokenNumberArray.length - 1];
    const comparisonArray = spokenNumberArray.slice(0, -1);
    if (comparisonArray.includes(lastNumber)) {
        const lastIndex = spokenNumberArray.lastIndexOf(lastNumber);
        const secondLastIndex = spokenNumberArray.lastIndexOf(lastNumber, lastIndex - 1);
        spokenNumberArray.push(lastIndex - secondLastIndex);
    } else {
        spokenNumberArray.push(0);
    }
}

console.log(spokenNumberArray[2019]);
