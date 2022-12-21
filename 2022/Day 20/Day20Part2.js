const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}
let decryptionKey = 811589153;
let arr = syncReadFile('./input.txt').map(number => parseInt(number) * decryptionKey);

arr = arr.map((element, index) => ({key: index, value: element}));

function moveValue (endIndex, currentIndex) {
    if (endIndex > currentIndex) { // they will never be equal
        arr.splice(endIndex + 1, 0, arr[currentIndex]); // inserts the value
        arr.splice(currentIndex, 1);
    } else {
        arr.splice(endIndex + 1, 0, arr[currentIndex]);
        arr.splice(currentIndex + 1, 1);
    }
}

let visited = new Set();
let arrLength = arr.length;
let loops = 0;
while (loops < 10) {
    let currentKey = 0;
    visited.clear();
    while (visited.size !== arrLength) { // look for the index of the next key
        if (visited.has(currentKey)) {
            currentKey++;
        } else {
            let currentIndex = arr.findIndex((element) => element.key === currentKey);
            let currentValueObject = arr[currentIndex];
            visited.add(currentValueObject.key);
            currentValue = currentValueObject.value;
            let moddedValue = currentValue % (arrLength - 1); // each cycle is (arrayLength - 1)
            if (moddedValue === 0) {
                currentKey++;
                continue;
            }
            if (currentIndex + moddedValue >= arrLength) { // currentValue must be positive in this case
                let moveItBack = arrLength - 1 - moddedValue; // number of indexes to move it back
                let endIndex = currentIndex - moveItBack;
                moveValue(endIndex - 1, currentIndex);
            } else {
                if (currentValue > 0) {
                    let endIndex = currentIndex + moddedValue; // doesn't go out of bounds
                    moveValue(endIndex, currentIndex);
                } else { // currentValue < 0
                    if (currentIndex + moddedValue === 0) {
                        moveValue(arr.length - 1, currentIndex);
                    }
                    else if (currentIndex + moddedValue > 0) { // check if it doesn't go out of bounds (since currentValue is negative)
                        let endIndex = currentIndex + moddedValue;
                        moveValue(endIndex - 1, currentIndex);
                    } else { // goes out of bounds
                        let tempValue = currentValue; // so I don't modify currentValue
                        while (tempValue < 0) {
                            tempValue += arrLength - 1;
                        }
                        moveValue(tempValue + currentIndex, currentIndex); // tempValue is endIndex
                    }
                }
            }
        }
    }
    console.log('arr after', loops, 'mixing:', arr);
    loops++;
}
// console.log('final arr is:', arr);

while (arr[0].value !== 0) { // put element with value of 0 at the start of the array
    arr.push(arr[0]);
    arr.shift();
}

console.log('1000:', arr[1000].value);
console.log('2000:', arr[2000].value);
console.log('3000:', arr[3000].value);

console.log('ans:', arr[1000].value + arr[2000].value + arr[3000].value);