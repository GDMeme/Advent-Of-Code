const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

arrIndex = 0;
newArr = [];
newArray = [] // new array will have all crates in 1 in 1st index, all crates in 2 in 2nd index, etc. 
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === ' ') {
            continue;
        } else { // I hit a letter
            newArr[Math.floor(j/4)] = arr[i][j+1];
            j += 3;
        }
    }
    for (let k = 0; k < newArr.length; k++) {
        if (newArray[k] === undefined) {
            newArray[k] = newArr[k];
        } else if (newArr[k]) {
            newArray[k] += newArr[k];
        }
    }
}
// newArray is from top to bottom

for (let i = 10; i < arr.length; i++) {
    const firstNumber = arr[i].split(' ')[1];
    const secondNumber = arr[i].split(' ')[3];
    const thirdNumber = arr[i].split(' ')[5];
    for (let j = 0; j < firstNumber; j++) {
        newArray[thirdNumber - 1] = newArray[secondNumber - 1][0] + newArray[thirdNumber - 1];
        newArray[secondNumber - 1] = newArray[secondNumber - 1].slice(1);
    }
}
solution = '';
for (let i = 0; i < newArray.length; i++) {
    solution += newArray[i][0];
}
console.log('solution is:', solution);