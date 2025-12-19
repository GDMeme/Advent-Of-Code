const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function findCombinations(resultString) {
    let possibleCombinations = [''];
    for (let i = 0; i < resultString.length; i++) {
        if (resultString[i] !== 'X') {
            possibleCombinations = possibleCombinations.map(e => e + resultString[i]);
        } else {
            const tempArray = [];
            possibleCombinations = possibleCombinations.map(e => {
                tempArray.push(e + '0');
                tempArray.push(e + '1');
            });
            possibleCombinations = cloneDeep(tempArray);
        }
    }
    return possibleCombinations;
}

const memoryMap = new Map();

for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] === 'a') {
        const mask = arr[i].split(' ')[2];
        i++;
        while (arr[i][1] !== 'a') {
            let [address, equals, value] = arr[i].split(' ');
            address = parseInt(address.split('[')[1].slice(0, -1));
            let binaryAddress = parseInt(address).toString(2);
            while (binaryAddress.length !== 36) {
                binaryAddress = '0' + binaryAddress;
            }
            let result = '';
            for (let j = 0; j < mask.length; j++) {
                if (mask[j] === 'X') {
                    result = result + 'X';
                } else if (mask[j] === '0') {
                    result = result + binaryAddress[j];
                } else {
                    result = result + '1';
                }
            }
            const possibleCombinationsArray = findCombinations(result);
            const possibleAddresses = possibleCombinationsArray.map(e => parseInt(e, 2));
            for (const address of possibleAddresses) {
                memoryMap.set(address, parseInt(value));
            }
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
