const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let maxSum = 0;
let sum = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '') {
        sum += parseInt(arr[i]);
    } else {
        if (sum > maxSum) {
            maxSum = sum;
        }
        sum = 0;
    }
}
console.log('maxsum is:', maxSum);