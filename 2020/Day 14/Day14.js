const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const memoryMap = new Map();

for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] === 'a') {
        const mask = arr[i].split(' ')[2];
        i++;
        while (arr[i][1] !== 'a') {
            let [memoryLocation, equals, memoryNumber] = arr[i].split(' ');
            memoryLocation = parseInt(memoryLocation.split('[')[1].slice(0, -1));
            let binaryMemoryNumber = parseInt(memoryNumber).toString(2);
            while (binaryMemoryNumber.length !== 36) {
                binaryMemoryNumber = '0' + binaryMemoryNumber;
            }
            let newBinaryNumber = '';
            for (let j = 0; j < mask.length; j++) {
                if (mask[j] === 'X') {
                    newBinaryNumber = newBinaryNumber + binaryMemoryNumber[j];
                } else {
                    newBinaryNumber = newBinaryNumber + mask[j];
                }
            }
            const actualValue = parseInt(newBinaryNumber, 2);
            memoryMap.set(memoryLocation, actualValue);
            if (i === arr.length - 1) {
                break;
            }
            i++;
        }
        i--;
    }
}

let sum = 0;

for (const [key, value] of memoryMap) {
    sum += value;
}
console.log(sum);