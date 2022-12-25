const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let counter = 0;
for (let i = 0; i < arr.length; i++) {
    firstElf = arr[i].split(',')[0];
    secondElf = arr[i].split(',')[1];
    firstElfRange = parseInt(firstElf.split('-')[1]) - parseInt(firstElf.split('-')[0]);
    secondElfRange = parseInt(secondElf.split('-')[1]) - parseInt(secondElf.split('-')[0]);
    if (firstElfRange < secondElfRange) { // assume firstElfRange is bigger
        temp = secondElf;
        secondElf = firstElf;
        firstElf = temp;
    }
    if (parseInt(secondElf.split('-')[1]) <= parseInt(firstElf.split('-')[1]) && parseInt(secondElf.split('-')[0]) >= parseInt(firstElf.split('-')[0])){
        counter++;
    }
}
console.log('counter is:', counter);