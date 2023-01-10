const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

const spokenNumberArray = new Array(30000000);

let currentIndex = 0;

for (const elem of arr) {
    spokenNumberArray[currentIndex] = elem;
    currentIndex++;
}

while (currentIndex !== 30000000) {
    const lastNumber = spokenNumberArray[spokenNumberArray.length - 1];
    const comparisonArray = spokenNumberArray.slice(0, -1);
    if (comparisonArray.includes(lastNumber)) {
        const lastIndex = spokenNumberArray.lastIndexOf(lastNumber);
        const secondLastIndex = spokenNumberArray.lastIndexOf(lastNumber, lastIndex - 1);
        spokenNumberArray[currentIndex] = lastIndex - secondLastIndex;
    } else { // make a map which has the index of the last number (don't use includes)
        // store the number you're about to add; on the next iteration, add it to the map and array after checking if the key exists in the map
        spokenNumberArray[currentIndex] = 0;
    }
    currentIndex++;
    if (currentIndex % 100000 === 0) {
        console.log(currentIndex);
    }
}

console.log(spokenNumberArray[29999999]);
