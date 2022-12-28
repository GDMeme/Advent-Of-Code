const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function insertCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index);
}

let template = arr[0];

const pairInsertion = [];

for (let i = 2; i < arr.length; i++) {
    const [pair, insert] = arr[i].split(' -> ');
    pairInsertion.push({pair, insert});
}

for (let i = 0; i < 10; i++) { // 10 rounds
    const currentLength = template.length;
    for (let j = currentLength - 2; j >= 0; j--) {
        const pair = template.substring(j, j + 2);
        template = insertCharAt(template, j + 1, pairInsertion[pairInsertion.findIndex(element => element.pair === pair)].insert);
    }
}

let currentLettersSeen = [];
let currentLetterCounter = [];

for (const letter of template) {
    let currentIndex = currentLettersSeen.findIndex(element => element === letter);
    if (currentIndex !== -1) {
        currentLetterCounter[currentIndex]++;
    } else {
        currentLetterCounter.push(0);
        currentLettersSeen.push(letter);
    }
}

currentLetterCounter.sort(function(a, b) {
    return a - b;
});

console.log(currentLetterCounter[currentLetterCounter.length - 1] - currentLetterCounter[0]);