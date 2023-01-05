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
    const [firstIndex, secondIndex] = range.split('-').map(e => parseInt(e));
    letter = letter.slice(0, -1);   
    if (string[firstIndex - 1] === letter || string[secondIndex - 1] === letter) {
        if (!(string[firstIndex - 1] === letter && string[secondIndex - 1] === letter)) {
            validCounter++;
        }
    }

}

console.log(validCounter);