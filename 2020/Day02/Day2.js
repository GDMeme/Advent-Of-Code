const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let validCounter = 0;

for (const elem of arr) {
    let [range, letter, string] = elem.split(' ');
    const [bottomRange, topRange] = range.split('-').map(e => parseInt(e));
    letter = letter.slice(0, -1);
    let letterCounter = 0;
    for (const eachLetter of string) {
        if (eachLetter === letter) {
            letterCounter++;
        }
    }
    if (letterCounter >= bottomRange && letterCounter <= topRange) {
        validCounter++;
    }
}

console.log(validCounter);