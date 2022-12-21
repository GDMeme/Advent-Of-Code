const {readFileSync, promises: fsPromises} = require('fs');

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
for (let i = 0; i < arr.length; i++) {
    let [key, value, operator, secondMonkey] = arr[i].split(' ');

    if (operator === undefined) {
        value = parseInt(value);
        monkeyValue.push({key: key.substring(0, key.length - 1), value: value});
        newArr.push({key: key.substring(0, key.length - 1), value: value});
    } else {
        newArr.push({key: key.substring(0, key.length - 1), value: value + ',' + operator + ',' + secondMonkey})
    }
}
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
let rootMonkeyIndex = monkeyValue.findIndex(element => element.key === 'root');
console.log('ans:', monkeyValue[rootMonkeyIndex].value);

const t1 = performance.now();
console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);