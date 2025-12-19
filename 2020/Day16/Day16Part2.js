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

index += 2;

const myTicket = arr[index].split(',').map(e => parseInt(e));

index += 3;

// looked at input to make this part easier

let globalLower = Number.MAX_SAFE_INTEGER;
let globalUpper = Number.MIN_SAFE_INTEGER;

for (const value of fieldNameRangeMap.values()) {
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

let workingTicketsArray = [];

for (let i = index; i < arr.length; i++) {
    const ticketNumbers = arr[i].split(',').map(e => parseInt(e));
    let invalid = false;
    for (const elem of ticketNumbers) {
        if (!(elem >= globalLower && elem <= globalUpper)) {
            invalid = true;
        }
    }
    if (!invalid) {
        workingTicketsArray.push(ticketNumbers);
    }
}

const matchingTicketArray = [];

for (let i = 0; i < workingTicketsArray.length; i++) {
    const individualTicketArray = workingTicketsArray[i];
    matchingTicketArray[i] = [];
    for (let j = 0; j < individualTicketArray.length; j++) {
        matchingTicketArray[i][j] = [];
        for (const [key, value] of fieldNameRangeMap) {
            const [firstRange, secondRange] = value.split(',');
            const [firstLower, firstUpper] = firstRange.split('-').map(e => parseInt(e));
            const [secondLower, secondUpper] = secondRange.split('-').map(e => parseInt(e));
            if ((individualTicketArray[j] >= firstLower && individualTicketArray[j] <= firstUpper) || (individualTicketArray[j] >= secondLower && individualTicketArray[j] <= secondUpper)) {
                matchingTicketArray[i][j].push(key);
            }
        }
    }
}

const possibleFields = [];

for (let i = 0; i < fieldNameRangeMap.size; i++) {
    possibleFields.push([]);
    for (const key of fieldNameRangeMap.keys()) {
        let notPossible = false;
        for (let k = 0; k < matchingTicketArray.length; k++) {
            if (matchingTicketArray[k][i].includes(key)) {
                continue;
            } else {
                notPossible = true;
                break;
            }
        }
        if (!notPossible) {
            possibleFields[i].push(key);
        }
    }
}

const solvedMap = new Map();

while (solvedMap.size !== fieldNameRangeMap.size) {
    let currentField = '';
    for (let i = 0; i < possibleFields.length; i++) {
        if (possibleFields[i].length === 1) {
            currentField = possibleFields[i][0];
            solvedMap.set(possibleFields[i][0], i);
            break;
        }
    }
    for (let i = 0; i < possibleFields.length; i++) {
        const currentIndex = possibleFields[i].indexOf(currentField);
        if (currentIndex > -1) {
            possibleFields[i].splice(currentIndex, 1);
        }   
    }
}

let answer = 1;

for (const [key, value] of solvedMap) {
    if (key.split(' ')[0] === 'departure') {
        answer *= myTicket[value];
    }
}

console.log(answer);