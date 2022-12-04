const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let firstCompartment = undefined;
let secondCompartment = undefined;
let breakForLoop = undefined;
let duplicateCharacter = undefined;
let sum = 0;
for (let i = 0; i < arr.length; i++) {
    duplicateCharacter = undefined;
    breakForLoop = false;
    firstCompartment = arr[i].slice(0, (arr[i].length)/2);
    secondCompartment = arr[i].slice((arr[i].length)/2);
    for (let j = 0; j < firstCompartment.length; j++) {
        if (breakForLoop === true) {
            break;
        }
        for (let k = 0; k < secondCompartment.length; k++) {
            if (firstCompartment[j] === secondCompartment[k]){
                duplicateCharacter = firstCompartment[j];
                console.log(duplicateCharacter);
                breakForLoop = true;
                break;
            }
        }
    }
    if (duplicateCharacter.toUpperCase() === duplicateCharacter) { // uppercase character
        sum += duplicateCharacter.charCodeAt() - 38;
    } else { // lowercase character
        sum += duplicateCharacter.charCodeAt() - 96;
    }
}
console.log('sum is:', sum);