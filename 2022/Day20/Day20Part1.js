const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(number => parseInt(number));

arr = arr.map((element, index) => ({key: index, value: element}));

let currentIndex = 0;
let visited = new Set();
let arrLength = arr.length;

function moveValue (endIndex, currentIndex) {
    if (endIndex > currentIndex) { // they will never be equal
        arr.splice(endIndex + 1, 0, arr[currentIndex]); // inserts the value
        arr.splice(currentIndex, 1);
    } else {
        arr.splice(endIndex + 1, 0, arr[currentIndex]);
        arr.splice(currentIndex + 1, 1);
    }
}
function test() {
    let newArr = [];
    newArr.length = 0;
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].value);
    }
    return newArr;
}


while (visited.size !== arrLength) {
    // console.log('currentIndex here here is:', currentIndex);
    // console.log(test());
    if (visited.has(arr[currentIndex].key)) {
        currentIndex++;
        // console.log('i got here');
        // console.log('currentIndex is:', currentIndex);
    } else {
        // console.log('currentIndex here is:', currentIndex);
        let currentValueObject = arr[currentIndex];
        // console.log('currentValueObject is:', currentValueObject);
        visited.add(currentValueObject.key);
        // console.log('visited is:', visited);
        currentValue = currentValueObject.value;
        let moddedValue = currentValue % (arrLength - 1); // each cycle is (arrayLength - 1)
        if (moddedValue === 0) {
            currentIndex++;
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
// console.log('final arr is:', arr);

while (arr[0].value !== 0) { // put element with value of 0 at the start of the array
    arr.push(arr[0]);
    arr.shift();
}

console.log('1000:', arr[1000].value);
console.log('2000:', arr[2000].value);
console.log('3000:', arr[3000].value);

console.log('ans:', arr[1000].value + arr[2000].value + arr[3000].value);

// assign each element in arr a specific key

// iterate through the whole array

// for every element, add the key to a set called visited (at the end)

// move the value wherever it needs to go, along with its key

// don't increment the current index unless that current index's key is in the visited set, then increment the index 
// (probably use a while loop? like while (!visited.has(key)) nested in the for loop)