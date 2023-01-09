const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

const findNumber = 36845998; // from part 1

for (let i = 0; i < arr.length - 25; i++) {
    let currentSum = 0;
    let currentCounter = i;
    while (currentSum < findNumber) {
        currentSum += arr[currentCounter];
        if (currentSum === findNumber && currentCounter !== i) {
            console.log(arr[i] + arr[currentCounter]);
            break;
        }
        currentCounter++;
    }
}