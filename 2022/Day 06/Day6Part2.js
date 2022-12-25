const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

for (let i = 0; i < arr[0].length - 14; i++) {
    found = false;
    inputString = arr[0].slice(i, 14 + i);
    for (let j = 0; j < inputString.length - 1; j++) {
        for (let k = j + 1; k < inputString.length; k++) {
            if (inputString[j] === inputString[k]) { // duplicate found
                found = true;
                break;
            }
        }
    }
    if (found === false) {
        console.log('index is:', i + 14);
        break;
    }
}