const { readFileSync, promises: fsPromises } = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let index = 0;

const fieldNameRangeMap = new Map();

while (arr[index] !== '') {
    let [fieldName, ranges] = arr[index].split(': ');
    const [firstRange, secondRange] = ranges.split(' or ');
    fieldNameRangeMap.set(fieldName, [firstRange, secondRange].join());
    index++;
}

index = index + 5;

// looked at input to make this part easier

let globalLower = Number.MAX_SAFE_INTEGER;
let globalUpper = Number.MIN_SAFE_INTEGER;

for (const [key, value] of fieldNameRangeMap) {
    const [firstRange, secondRange] = value.split(',');
    const [firstLower, firstUpper] = firstRange.split('-').map(e => parseInt(e));
    const [secondLower, secondUpper] = secondRange.split('-').map(e => parseInt(e));
    if (firstLower < globalLower) {
        globalLower = firstLower;
    }
    if (secondLower < globalLower) {
        globalLower = secondLower;
    }
    if (firstUpper > globalUpper) {
        globalUpper = firstUpper;
    }
    if (secondUpper > globalUpper) {
        globalUpper = secondUpper;
    }
}

let sum = 0;

for (let i = index; i < arr.length; i++) {
    const ticketNumbers = arr[i].split(',').map(e => parseInt(e));
    for (const elem of ticketNumbers) {
        if (!(elem >= globalLower && elem <= globalUpper)) {
            sum += elem;
        }
    }
}

console.log(sum);

// misunderstood the instructions

// const myTicket = arr[index].split(',').map(e => parseInt(e));

// const matchingTicketArray = [];

// for (let i = 0; i < myTicket.length; i++) {
//     matchingTicketArray.push([]);
//     for (const [key, value] of fieldNameRangeMap) {
//         const [firstRange, secondRange] = value.split(',');
//         const [firstLower, firstUpper] = firstRange.split('-').map(e => parseInt(e));
//         const [secondLower, secondUpper] = secondRange.split('-').map(e => parseInt(e));
//         if ((myTicket[i] >= firstLower && myTicket[i] <= firstUpper) || (myTicket[i] >= secondLower && myTicket[i] <= secondUpper)) {
//             matchingTicketArray[i].push(key);
//         }
//     }
// }

// for (const elem of matchingTicketArray) {
//     console.log(elem.length);
// }