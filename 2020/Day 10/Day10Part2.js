const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

arr.sort(function (a, b) {
    return a - b;
});

arr.unshift(0);
arr.push(arr[arr.length - 1] + 3);

threeDigitSeparatedArray = [[]];
let indexCounter = 0;

for (let i = 0; i < arr.length; i++) {
    threeDigitSeparatedArray[indexCounter].push(arr[i]);
    if (arr[i + 1] === arr[i] + 3) {
        indexCounter++;
        threeDigitSeparatedArray.push([]);
    }
}

let answer = 1;

function findPaths(myArray, frontier) {
    let counter = 0;
    while (frontier.length !== 0) {
        const currentValue = frontier.shift();
        if (currentValue === myArray[myArray.length - 1]) {
            counter++;
        }
        if (myArray.includes(currentValue + 1)) {
            frontier.push(currentValue + 1);
        }
        if (myArray.includes(currentValue + 2)) {
            frontier.push(currentValue + 2);
        }
        if (myArray.includes(currentValue + 3)) {
            frontier.push(currentValue + 3);        
        }
    }
    return counter;
}

for (const elem of threeDigitSeparatedArray) {
    if (elem.length === 1 || elem.length === 2) {
        continue;
    } else {
        const frontier = [];
        frontier.push(elem[0]);
        answer *= findPaths(elem, frontier);
    }
}

console.log(answer);