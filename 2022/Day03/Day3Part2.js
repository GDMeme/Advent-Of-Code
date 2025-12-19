const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let firstRuckSack = undefined;
let secondRuckSack = undefined;
let thirdRuckSack = undefined;
let breakForLoop = false;
let duplicateCharacter = undefined;
let sum = 0;
for (let i = 0; i < arr.length; i+=3) {
    breakForLoop = false;
    firstRuckSack = arr[i];
    secondRuckSack = arr[i+1];
    thirdRuckSack = arr[i+2];
    duplicateCharacter = undefined;
    for (let j = 0; j < firstRuckSack.length; j++) {
        if (breakForLoop) {
            break;
        }
        for (let k = 0; k < secondRuckSack.length; k++) {
            if (breakForLoop) {
                break;
            }
            for (let l = 0; l < thirdRuckSack.length; l++) {
                if (firstRuckSack[j] === secondRuckSack[k] && firstRuckSack[j] === thirdRuckSack[l]) {
                    duplicateCharacter = firstRuckSack[j];
                    breakForLoop = true;
                    break;
                }
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
