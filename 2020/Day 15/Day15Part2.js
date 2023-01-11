const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

const spokenNumberArray = new Array(30000000);

let currentIndex = 0;

const lastIndexMap = new Map();

for (let i = 0; i < arr.length - 1; i++) {
    spokenNumberArray[currentIndex] = arr[i];
    lastIndexMap.set(arr[i], currentIndex);
    currentIndex++;
}

spokenNumberArray[currentIndex] = arr[arr.length - 1];
currentIndex++;

while (currentIndex !== 30000000) {
    const lastNumber = spokenNumberArray[currentIndex - 1];
    if (lastIndexMap.has(lastNumber)) {
        spokenNumberArray[currentIndex] = currentIndex - 1 - lastIndexMap.get(lastNumber);
    } else {
        spokenNumberArray[currentIndex] = 0;
    }
    lastIndexMap.set(lastNumber, currentIndex - 1);
    currentIndex++;
}

console.log(spokenNumberArray[29999999]);
