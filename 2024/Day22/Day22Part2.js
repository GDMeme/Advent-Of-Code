const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const numIterations = 2000;

const globalSum = new Map();
for (const number of arr) {
    let secretNum = parseInt(number);
    const diffArray = [];
    let prevSecretNum = secretNum;
    const currentMonkeySet = new Set();
    for (let i = 0; i < numIterations; i++) {
        const previousOnesDigit = secretNum % 10;
        secretNum = secretNum ^ (secretNum * 64);
        secretNum = secretNum % 16777216;
        
        secretNum = secretNum ^ (Math.floor(secretNum / 32));
        secretNum = secretNum % 16777216;
        
        secretNum = secretNum ^ (secretNum * 2048);
        secretNum = secretNum % 16777216;
        if (secretNum < 0) {
            secretNum += 16777216;
        }
        
        const onesDigit = secretNum % 10;
        
        const diff = onesDigit - previousOnesDigit;
        diffArray.push(diff);
        
        if (diffArray.length === 4) {
            const key = diffArray.join(",");
            
            diffArray.shift();
            if (currentMonkeySet.has(key)) {
                continue;
            }
            currentMonkeySet.add(key);
            
            globalSum.set(key, globalSum.has(key) ? (globalSum.get(key) + onesDigit) : onesDigit);
        }
    }
}

console.log(Math.max(...globalSum.values()));