const {readFileSync, promises: fsPromises} = require('fs');
const { multiply } = require('mathjs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

function divisible(value, divisor) { // string, int
    if (divisor === 13) {
        // multiply the last digit by 4
        // add it to the rest of the number
        // check if divisible by 13 (when length <= 2)
        while (value.length > 2) {
            let temp = parseInt(value[value.length - 1]) * 4;
            value = add(value.slice(0, -1), temp);
        }
        return (parseInt(value) % 13 === 0);
    } else if (divisor === 19) {
        // add 2 times the last digit to the remaining number until length <= 10
        // if result divisible by 19, original number is also divisible by 19
        while (value.length > 2) {
            let temp = parseInt(value[value.length - 1] * 2);
            value = add(value.slice(0, -1), temp);
        }
        return (parseInt(value) % 19 === 0);
    } else if (divisor === 5) {
        return (value[value.length - 1] === '5' || value[value.length - 1] === '0');
    } else if (divisor === 2) {
        let temp = value[value.length - 1];
        return (temp === '0' || temp === '2' || temp === '4' || temp === '6' || temp === '8');
    } else if (divisor === 17) {
        // Multiply the number in the unit’s place by 12, and add to the rest. 
        // If it is divisible by 17 then the original number is divisible by 17.
        while (value.length > 2) {
            let temp = parseInt(value[value.length - 1]);
            for (let i = 0; i < 12; i++) {
                value = add(value.slice(0, -1), temp);
            }
        }
        return (parseInt(value) % 17 === 0);
    } else if (divisor === 11) {
        // take the alternating sum of the digits in the number, read from left to right.
        // if that is divisible by 11, so is the original number.
        let newValue = 0;
        for (let i = 0; i < value.length; i++) {
            if (i % 2 === 0) { // i is even
                newValue -= parseInt(value[i]);
            } else {
                newValue += parseInt(value[i]);
            }
        }
        return (newValue % 11 === 0);
        // 7, 3
    } else if (divisor === 7) {
        // check character mod 7
        // remainder * 10 + next character
        // this is new character (check mod 7)
        // character is 0 by end means divisible by 7
        let remainder = 0;
        for (let i = 0; i < value.length; i++) {
            let temp = remainder * 10 + parseInt(value[i]);
            remainder = temp % 7;
        }
        return (remainder === 0);
    } else { // check divisibility for 3
        // if sum of digits is divisible by 3, so is original number
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            sum += value[i];
        }
        return (sum % 3 === 0);
    }
}

function add(value, add) { // string, int
    let temp = (parseInt(value[value.length - 1]) + add).toString();
    let carry = 0;
    returnValue = '';
    let notFirst = true;
    for (let i = value.length - 1; i >= 0; i--) { 
        if (!notFirst) {
            temp = (parseInt(value[i]) + parseInt(carry)).toString();
        }
        notFirst = false;
        if (temp.length === 2) { // will never be a 3 digit number
            carry = temp[0];
            let newTemp = temp[1];
            returnValue = newTemp + returnValue;
            if (i === 0) {
                return (carry + returnValue);
            }
        } else { // no carry
            returnValue = temp + returnValue;
            for (let j = i - 1; j >= 0; j--) {
                returnValue = value[j] + returnValue;
            }
            break;
        }
    }
    return returnValue;
}

function giveMonkeyStartingItems (index, monkeyNumber) {
    worryLevel[monkeyNumber] = arr[index].split(' ').slice(4);
    for (let j = 0; j < worryLevel[monkeyNumber].length; j++) { // remove the trailing comma
        if (worryLevel[monkeyNumber][j][2] === ',') { // only 2 digit numbers
            worryLevel[monkeyNumber][j] = worryLevel[monkeyNumber][j].slice(0, -1); // keep it as a string
        }
    }
}

let arr = syncReadFile('./input.txt');
let worryLevel = [[], [], [], [] ,[] ,[], [], []];
let counter = 0;
for (let i = 0; i < arr.length; i++) { // give starting items to monkeys
    if (arr[i][2] === 'S') {
        giveMonkeyStartingItems(i, counter);
        counter++;
    }
}
// store the massive number as a string
// multiply/add to the number as necessary
// perform divisibility rules on the number

// TODO: multiply function

inspectCounter = [0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < 10000; i++) { // 10000 rounds
    for (let j = 0; j < 8; j++) { // 8 monkeys
        const numberOfItems = worryLevel[j].length;
        for (let k = 0; k < numberOfItems; k++) { // each monkey's item
            if (j === 0) { // monkey 0
                let currentValue = worryLevel[j][k];
                currentValue = multiply(currentValue, 7) // hardcoded for now
                // parameters are string and multiplyValue, returns a string
                if (divisible(currentValue, 13)) { // also hardcoded for now
                    worryLevel[1].push(currentValue);
                } else {
                    worryLevel[3].push(currentValue);
                }
                inspectCounter[0]++;
            } else if (j === 1) {
                let currentValue = worryLevel[j][k];
                currentValue = add(currentValue, 7);
                if (divisible(currentValue, 19)) {
                    worryLevel[2].push(currentValue);
                } else {
                    worryLevel[7].push(currentValue);
                }
                inspectCounter[1]++;
            } else if (j === 2) {
                let currentValue = worryLevel[j][k];
                currentValue = multiply(currentValue, 3)
                if (divisible(currentValue, 5)) {
                    worryLevel[5].push(currentValue);
                } else {
                    worryLevel[7].push(currentValue);
                }
                inspectCounter[2]++;
            } else if (j === 3) {
                let currentValue = worryLevel[j][k];
                currentValue = add(currentValue, 3)
                if (divisible(currentValue, 2)) {
                    worryLevel[1].push(currentValue);
                } else {
                    worryLevel[2].push(currentValue);
                }
                inspectCounter[3]++;
            } else if (j === 4) {
                let currentValue = worryLevel[j][k];
                currentValue = multiply(currentValue, currentValue) // check if second parameter is a string
                if (divisible(currentValue, 17)) {
                    worryLevel[6].push(currentValue);
                } else {
                    worryLevel[0].push(currentValue);
                }
                inspectCounter[4]++;
            } else if (j === 5) {
                let currentValue = worryLevel[j][k];
                currentValue = add(currentValue, 8);
                if (divisible(currentValue, 11)) {
                    worryLevel[4].push(currentValue);
                } else {
                    worryLevel[6].push(currentValue);
                }
                inspectCounter[5]++;
            } else if (j === 6) {
                let currentValue = worryLevel[j][k];
                currentValue = add(currentValue, 2);
                if (divisible(currentValue, 7)) {
                    worryLevel[3].push(currentValue);
                } else {
                    worryLevel[0].push(currentValue);
                }
                inspectCounter[6]++;
            } else if (j === 7) {
                let currentValue = worryLevel[j][k];
                currentValue = add(currentValue, 4);
                if (divisible(currentValue, 3)) {
                    worryLevel[4].push(currentValue);
                } else {
                    worryLevel[5].push(currentValue);
                }
                inspectCounter[7]++;
            }
            if (k === numberOfItems - 1) {
                worryLevel[j] = [];
            }
        }
    }
}
// find max and secondMax in inspectCounter
let max = 0;
let secondMax = 0;
for (let i = 0; i < inspectCounter.length; i++) {
    if (inspectCounter[i] > secondMax) {
        if (inspectCounter[i] > max) {
            secondMax = max;
            max = inspectCounter[i];
        } else {
            secondMax = inspectCounter[i];
        }
    }
}
console.log(worryLevel);
console.log('break');
console.log(inspectCounter);
console.log(max);
console.log(secondMax);
console.log(max * secondMax);