const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const numIterations = 2000;
let result = 0;
for (const number of arr) {
    let secretNumber = parseInt(number);
    for (let i = 0; i < numIterations; i++) {
        secretNumber = secretNumber ^ (secretNumber * 64);
        secretNumber = secretNumber % 16777216;
        
        secretNumber = secretNumber ^ (Math.floor(secretNumber / 32));
        secretNumber = secretNumber % 16777216;
        
        secretNumber = secretNumber ^ (secretNumber * 2048);
        secretNumber = secretNumber % 16777216;
        if (secretNumber < 0) {
            secretNumber += 16777216;
        }
    }
    result += secretNumber;
}

console.log(result);