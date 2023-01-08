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
    let smallerBagsArray = smallerBags.split(', '); // the number of bags doesn't matter
    largeBag = largeBag.split(' bag')[0];
    smallerBagsArray = smallerBagsArray.map(e => {
        const words = e.split(' ');
        return words[1] + ' ' + words[2];
    });
    bagMap.set(largeBag, smallerBagsArray);
    if (smallerBagsArray.includes('shiny gold')) {
        possibleBags.add(largeBag);
    }
} // "no other bags" appears as "other bags."

while (true) {
    let addedBag = false;
    for (const [key, value] of bagMap) {
        for (const bag of possibleBags) {
            if (value !== 'other bags.' && value.includes(bag) && !possibleBags.has(key)) {
                possibleBags.add(key);
                addedBag = true;
            }
        }
    }
    if (!addedBag) {
        break;
    }
}

console.log(possibleBags.size);