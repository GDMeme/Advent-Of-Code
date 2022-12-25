const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function convertSNAFUToDecimal (input) {
    input = Array.from(input);
    let factorOfFive = 0;
    let sum = 0;
    for (let i = input.length - 1; i >= 0; i--) {
        if (input[i] === '-') {
            input[i] = -1;
        } else if (input[i] === '=') {
            input[i] = -2;
        }
        sum += parseInt(input[i]) * (Math.pow(5, factorOfFive));
        factorOfFive++;
    }
    return sum;
}

function convertDecimalToSNAFU (input) {
    let currentNumberOfDigits = 0;
    let maxCurrentNumber = 1;
    while (input > maxCurrentNumber) { // to calculate number of digits
        currentNumberOfDigits++;
        let tempSum = Math.pow(5, currentNumberOfDigits);
        for (let i = 0; i < currentNumberOfDigits; i++) {
            tempSum -= (2 * Math.pow(5, currentNumberOfDigits - i - 1))
        }
        maxCurrentNumber = tempSum;
    }
    let actualNumberArr = [];
    let currentPower = Math.pow(5, currentNumberOfDigits - 1);
    let currentCounter = 0;
    while (currentNumberOfDigits - currentCounter - 1 !== -1) {
        let counter = 0;
        while (input - currentPower >= 0) {
            counter++;
            input -= currentPower;
        }
        actualNumberArr.push(counter);
        currentCounter++;
        currentPower = Math.pow(5, currentNumberOfDigits - currentCounter - 1);
    }
    for (let i = actualNumberArr.length - 1; i >= 0; i--) {
        if (actualNumberArr[i] === 3) {
            actualNumberArr[i] = '=';
            actualNumberArr[i - 1] += 1;
        } else if (actualNumberArr[i] === 4) {
            actualNumberArr[i] = '-';
            actualNumberArr[i - 1] += 1;
        } else if (actualNumberArr[i] === 5) {
            actualNumberArr[i] = 0;
            actualNumberArr[i - 1] += 1;
        }
    }
    return actualNumberArr;
}

let sum = 0;
for (let i = 0; i < arr.length; i++) {
    sum += convertSNAFUToDecimal(arr[i]);
}

console.log('ans:', convertDecimalToSNAFU(sum).join(''));