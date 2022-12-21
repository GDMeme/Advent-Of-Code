const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt')

// assign initial states (monkeys with integers)

// while monkeyValue.length !== arr.length

const t0 = performance.now();

let monkeyValue = [];
let newArr = [];
let rootFirstMonkey = '';
let rootSecondMonkey = '';
for (let i = 0; i < arr.length; i++) {
    let [key, value, operator, secondMonkey] = arr[i].split(' ');
    if (key === 'root:') {
        rootFirstMonkey = value;
        rootSecondMonkey = secondMonkey;
    }
    if (operator === undefined) {
        value = parseInt(value);
        monkeyValue.push({key: key.substring(0, key.length - 1), value: value});
        newArr.push({key: key.substring(0, key.length - 1), value: value});
    } else {
        newArr.push({key: key.substring(0, key.length - 1), value: value + ',' + operator + ',' + secondMonkey})
    }
}
let tempMonkeyValue = cloneDeep(monkeyValue);

let humnIndex = monkeyValue.findIndex(element => element.key === 'humn');

let binarySearchValue = 1;


let firstMonkeyValue = 2; // providing initial conditions for while loop
let secondMonkeyValue = 1;

while (firstMonkeyValue > secondMonkeyValue) {
    binarySearchValue *= 2;
    monkeyValue = cloneDeep(tempMonkeyValue);
    monkeyValue[humnIndex].value = binarySearchValue;
    while (monkeyValue.length !== newArr.length) {
        for (let i = 0; i < arr.length; i++) {
            if (monkeyValue.some(element => element.key === newArr[i].key)) {
                continue;
            } else {
                let [firstMonkey, operator, secondMonkey] = newArr[i].value.split(',');
                originalMonkey = newArr[i].key;
                if ((monkeyValue.some(element => element.key === firstMonkey)) && monkeyValue.some(element => element.key === secondMonkey)) {
                    let firstMonkeyIndex = monkeyValue.findIndex(element => element.key === firstMonkey);
                    let secondMonkeyIndex = monkeyValue.findIndex(element => element.key === secondMonkey);
                    if (operator === '+') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value + monkeyValue[secondMonkeyIndex].value});
                    } else if (operator === '-') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value - monkeyValue[secondMonkeyIndex].value});
                    } else if (operator === '*') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value * monkeyValue[secondMonkeyIndex].value});
                    } else {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value / monkeyValue[secondMonkeyIndex].value});
                    }
                } else {
                    continue;
                }
            }
        }
    }
    let firstRootMonkeyIndex = monkeyValue.findIndex(element => element.key === rootFirstMonkey);
    let secondRootMonkeyIndex = monkeyValue.findIndex(element => element.key === rootSecondMonkey);
    firstMonkeyValue = monkeyValue[firstRootMonkeyIndex].value;
    secondMonkeyValue = monkeyValue[secondRootMonkeyIndex].value;
}

let lowerBound = binarySearchValue / 2;
let upperBound = binarySearchValue;
let newhumnValue = binarySearchValue;

while (firstMonkeyValue !== secondMonkeyValue) {
    if (firstMonkeyValue < secondMonkeyValue) {
        upperBound = newhumnValue;
        newhumnValue = (upperBound + lowerBound) / 2;
    } else {
        lowerBound = newhumnValue;
        newhumnValue = (upperBound + lowerBound) / 2;
    }
    monkeyValue = cloneDeep(tempMonkeyValue);
    monkeyValue[humnIndex].value = newhumnValue;
    while (monkeyValue.length !== newArr.length) {
        for (let i = 0; i < arr.length; i++) {
            if (monkeyValue.some(element => element.key === newArr[i].key)) {
                continue;
            } else {
                let [firstMonkey, operator, secondMonkey] = newArr[i].value.split(',');
                originalMonkey = newArr[i].key;
                if ((monkeyValue.some(element => element.key === firstMonkey)) && monkeyValue.some(element => element.key === secondMonkey)) {
                    let firstMonkeyIndex = monkeyValue.findIndex(element => element.key === firstMonkey);
                    let secondMonkeyIndex = monkeyValue.findIndex(element => element.key === secondMonkey);
                    if (operator === '+') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value + monkeyValue[secondMonkeyIndex].value});
                    } else if (operator === '-') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value - monkeyValue[secondMonkeyIndex].value});
                    } else if (operator === '*') {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value * monkeyValue[secondMonkeyIndex].value});
                    } else {
                        monkeyValue.push({key: originalMonkey, value: monkeyValue[firstMonkeyIndex].value / monkeyValue[secondMonkeyIndex].value});
                    }
                } else {
                    continue;
                }
            }
        }
    }
    let firstRootMonkeyIndex = monkeyValue.findIndex(element => element.key === rootFirstMonkey);
    let secondRootMonkeyIndex = monkeyValue.findIndex(element => element.key === rootSecondMonkey);
    firstMonkeyValue = monkeyValue[firstRootMonkeyIndex].value;
    secondMonkeyValue = monkeyValue[secondRootMonkeyIndex].value;
}
console.log('new humn value', newhumnValue);

// IDEA

// humn value does not affect second monkey value

// keep incrementing humn value until first monkey value becomes negative

// recursively check (low + high) / 2 until first monkey value === second monkey value

// some hardcoded stuff, like humn value only changes one of the monkeys, and when increasing humn value, that monkey's value always decreases

const t1 = performance.now();
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);