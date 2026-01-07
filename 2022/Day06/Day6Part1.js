const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

for (let i = 0; i < arr[0].length - 4; i++) {
    firstCharacter = arr[0][i];
    secondCharacter = arr[0][i+1];
    thirdCharacter = arr[0][i+2];
    fourthCharacter = arr[0][i+3];
    if ((firstCharacter !== secondCharacter) && (firstCharacter !== thirdCharacter) && (firstCharacter !== fourthCharacter) && (secondCharacter !== thirdCharacter) && (secondCharacter !== fourthCharacter) && (thirdCharacter !== fourthCharacter)) {
        console.log('index is:', i + 4);
        break;
    }
}