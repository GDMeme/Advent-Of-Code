const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const bagMap = new Map();

const possibleBags = new Set();

for (let i = 0; i < arr.length; i++) {
    let [largeBag, smallerBags] = arr[i].split(' contain ');
    let smallerBagsArray = smallerBags.split(', ');
    largeBag = largeBag.split(' bag')[0];
    smallerBagsArray = smallerBagsArray.map(e => {
        const words = e.split(' ');
        return words[0] + ' ' + words[1] + ' ' + words[2];
    });
    bagMap.set(largeBag, smallerBagsArray);
}

console.log(findBags('shiny gold'));

function findBags(name) {
    let currentBags = 0;
    for (const elem of bagMap.get(name)) {    
        let [number, word1, word2] = elem.split(' ');
        if (word1 + ' ' + word2 === 'other bags.') { // "no other bags" appears as "other bags."
            return 0;
        }
        number = parseInt(number);
        currentBags += number + (number * findBags(word1 + ' ' + word2));
    }
    return currentBags;
}