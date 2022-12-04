const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');
let firstSum = 0;
let secondSum = 0;
let thirdSum = 0;
let sum = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '') {
        sum += parseInt(arr[i]);
    } else {
        if (sum >= thirdSum) {
            if (sum >= secondSum) {
                if (sum >= firstSum) {
                    thirdSum = secondSum;
                    secondSum = firstSum;
                    firstSum = sum;
                } else {
                    thirdSum = secondSum;
                    secondSum = sum;
                }
            } else {
                thirdSum = sum;
            }
        }
        sum = 0;
    }
}
console.log('sum of top 3 is:', firstSum + secondSum + thirdSum);