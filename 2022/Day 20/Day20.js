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
        } // TODO: IF DOESN'T WORK, CHECK moddedValue LOGIC
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
                else if (currentIndex + currentValue > 0) { // check if it doesn't go out of bounds (since currentValue is negative)
                    let endIndex = currentIndex + moddedValue; // TODO: test if this works
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
console.log('final arr is:', arr);

let indexOfZero = -1;

for (let i = 0; i < arr.length; i++) {
    if (arr[i].value === 0) {
        indexOfZero = i;
        break;
    }
}

// calculate 1000th number after 0
let thousandthNumber = Number.MAX_SAFE_INTEGER;
if (indexOfZero + 1000 <= arr.length - 1) {
    thousandthNumber = arr[indexOfZero + 1000].value;
} else { // goes out of bounds, will only wrap around once BUT NOT FOR EXAMPLE :(
    let newIndex = indexOfZero - (arr.length - (1000 % arr.length));
    if (newIndex < 0) {
        newIndex += arr.length;
    }
    thousandthNumber = arr[newIndex].value;
}
console.log(thousandthNumber);

let twoThousandthNumber = Number.MAX_SAFE_INTEGER;
if (indexOfZero + 2000 <= arr.length - 1) {
    twoThousandthNumber = arr[indexOfZero + 2000].value;
} else { // goes out of bounds, will only wrap around once BUT NOT FOR EXAMPLE :(
    let newIndex = indexOfZero - (arr.length - (2000 % arr.length));
    if (newIndex < 0) {
        newIndex += arr.length;
    }
    twoThousandthNumber = arr[newIndex].value;
}
console.log(twoThousandthNumber);

let threeThousandthNumber = Number.MAX_SAFE_INTEGER;
if (indexOfZero + 3000 <= arr.length - 1) {
    threeThousandthNumber = arr[indexOfZero + 3000].value;
} else { // goes out of bounds, will only wrap around once BUT NOT FOR EXAMPLE :(
    let newIndex = indexOfZero - (arr.length - (3000 % arr.length));
    if (newIndex < 0) {
        newIndex += arr.length;
    }
    threeThousandthNumber = arr[newIndex].value;
}
console.log(threeThousandthNumber);

console.log('ans:', thousandthNumber + twoThousandthNumber + threeThousandthNumber);

// assign each element in arr a specific key

// iterate through the whole array

// for every element, add the key to a set called visited (at the end)

// move the value wherever it needs to go, along with its key

// don't increment the current index unless that current index's key is in the visited set, then increment the index 
// (probably use a while loop? like while (!visited.has(key)) nested in the for loop)