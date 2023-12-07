const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function getWinnings(array, rankResult) {
    for (let i = 0; i < array.length; i++) {
        rankResult[1] += array[i].bid * rankResult[0];
        rankResult[0]++;
    }
}

function sort(array) {
    for (let i = 0; i < array.length; i++) {
        array = array.sort((a, b) => {
            for (let j = 0; j < a.hand.length; j++) {
                if (a.hand[j] != b.hand[j]) {
                    return rankOrder.indexOf(a.hand[j]) - rankOrder.indexOf(b.hand[j]);
                }
            }
        });
    }
}

let rankOrder = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];

let fiveKind = [];
let fourKind = [];
let fullHouse = [];
let threeKind = [];
let twoPair = [];
let onePair = [];
let highCard = [];
let hand, bid;

let handArray;
let occurrenceArray;
let index;
let maxOccurrence;
let minOccurrence;

let numJacks;
let numPairs;

for (let i = 0; i < arr.length; i++) {
    numJacks = 0;
    handArray = [];
    occurrenceArray = [];
    [hand, bid] = arr[i].split(" ");
    bid = Number(bid);    

    for (let j = 0; j < hand.length; j++) {
        if (hand[j] === "J") {
            numJacks++;
            continue;
        }
        index = handArray.indexOf(hand[j]);
        if (index === -1) {
            handArray.push(hand[j]);
            occurrenceArray.push(1);
        } else {
            occurrenceArray[index]++;
        }
    }

    maxOccurrence = Math.max(...occurrenceArray);
    minOccurrence = Math.min(...occurrenceArray);
    numPairs = occurrenceArray.filter((e) => e === 2).length;
    if (maxOccurrence + numJacks === 5 || hand === "JJJJJ") { // missed edge case!! :(
        fiveKind.push({hand, bid});
    } else if (maxOccurrence + numJacks === 4) {
        fourKind.push({hand, bid});
    } else if (maxOccurrence + numJacks === 3) {
        if (numPairs === 2 || maxOccurrence === 3 && minOccurrence === 2) {
            fullHouse.push({hand, bid});
        } else {
            threeKind.push({hand, bid});
        }
    } else if (maxOccurrence + numJacks === 2) { // not possible to make 2 pair with any nonzero amount of jacks
        if (numPairs === 2) {
            twoPair.push({hand, bid});
        } else {
            onePair.push({hand, bid});
        }
    } else {
        highCard.push({hand, bid});
    }
} 

let allArray = [highCard, onePair, twoPair, threeKind, fullHouse, fourKind, fiveKind];

// need to pass by reference
let rankResult = [1, 0]; // rank, result

for (let i = 0; i < allArray.length; i++) {
    sort(allArray[i]);
    getWinnings(allArray[i], rankResult);
}

console.log(rankResult[1]);