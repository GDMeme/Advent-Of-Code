const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

// each of these have length 36

let monkey0Array = []; // multiply by 7, check divisible by 13
let monkey1Array = [];
let monkey2Array = [];
let monkey3Array = [];
let monkey4Array = [];
let monkey5Array = [];
let monkey6Array = [];
let monkey7Array = [];

function giveMonkeyStartingItems (index, monkeyNumber) {
    let temp = arr[index].split(' ').slice(4);
    for (let j = 0; j < temp.length; j++) { // remove the trailing comma
        if (temp[j][2] === ',') { // only 2 digit numbers
            monkey0Array.push(parseInt(temp[j].slice(0, -1)));
            monkey1Array.push(parseInt(temp[j].slice(0, -1)));
            monkey2Array.push(parseInt(temp[j].slice(0, -1)));
            monkey3Array.push(parseInt(temp[j].slice(0, -1)));
            monkey4Array.push(parseInt(temp[j].slice(0, -1)));
            monkey5Array.push(parseInt(temp[j].slice(0, -1)));
            monkey6Array.push(parseInt(temp[j].slice(0, -1)));
            monkey7Array.push(parseInt(temp[j].slice(0, -1)));
        } else {
            monkey0Array.push(parseInt(temp[j]));
            monkey1Array.push(parseInt(temp[j]));
            monkey2Array.push(parseInt(temp[j]));
            monkey3Array.push(parseInt(temp[j]));
            monkey4Array.push(parseInt(temp[j]));
            monkey5Array.push(parseInt(temp[j]));
            monkey6Array.push(parseInt(temp[j]));
            monkey7Array.push(parseInt(temp[j]));
        }
        indexArray[monkeyNumber].push(itemCounter);
        itemCounter++;
    }
}

let arr = syncReadFile('./input.txt');
let indexArray = [[], [], [], [] ,[] ,[], [], []];
let counter = 0;
let itemCounter = 0;
for (let i = 0; i < arr.length; i++) { // give starting items to monkeys
    if (arr[i][2] === 'S') {
        giveMonkeyStartingItems(i, counter);
        counter++;
    }
}
// (A * B) mod C = (A mod C * B mod C) mod C
// (currentValue * 7) mod 13

// loop to see how many items each monkey has (stored in index)
// for each item (just store the index), perform the addition/multiplication by updating the values in monkey0Array and monkey1Array, etc.
// push the item (index) to the corresponding location, checking whether it is divisible (value is 0 in monkey0Array or monkey1Array, etc. depending on who has the item)

inspectCounter = [0, 0, 0, 0, 0, 0, 0, 0];
for (let i = 0; i < 10000; i++) { // 10000 rounds
    for (let j = 0; j < 8; j++) { // 8 monkeys
        const numberOfItems = indexArray[j].length;
        for (let k = 0; k < numberOfItems; k++) { // each monkey's item
            let itemNumber = indexArray[j][k];
            if (j === 0) { // monkey 0, multiply by 7, check divisible by 13
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) * (7 % 13)) % 13;
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) * (7 % 19)) % 19;
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) * (7 % 5)) % 5;
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) * (7 % 2)) % 2;
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) * (7 % 17)) % 17;
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) * (7 % 11)) % 11;
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) * (7 % 7)) % 7;
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) * (7 % 3)) % 3;
                if (monkey0Array[itemNumber] === 0) {
                    indexArray[1].push(itemNumber);
                } else {
                    indexArray[3].push(itemNumber);
                }
                inspectCounter[0]++;
            } else if (j === 1) { // add 7, check divisible by 19
                // (a + b) mod c = a mod c + b mod c

                // 7 + 4
                // 7 mod 3 is 1, 4 mod 3 is 1
                // so 11 mod 3 is 2
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) + (7 % 13));
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) + (7 % 19));
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) + (7 % 5));
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) + (7 % 2));
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) + (7 % 17));
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) + (7 % 11));
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) + (7 % 7));
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) + (7 % 3));
                if (monkey1Array[itemNumber] % 19 === 0) {
                    indexArray[2].push(itemNumber);
                } else {
                    indexArray[7].push(itemNumber);
                }
                inspectCounter[1]++;
            } else if (j === 2) { // multiply by 3, check divisible by 5
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) * (3 % 13)) % 13;
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) * (3 % 19)) % 19;
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) * (3 % 5)) % 5;
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) * (3 % 2)) % 2;
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) * (3 % 17)) % 17;
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) * (3 % 11)) % 11;
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) * (3 % 7)) % 7;
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) * (3 % 3)) % 3;
                if (monkey2Array[itemNumber] === 0) {
                    indexArray[5].push(itemNumber);
                } else {
                    indexArray[7].push(itemNumber);
                }
                inspectCounter[2]++;
            } else if (j === 3) { // add 3, check divisible by 2
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) + (3 % 13));
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) + (3 % 19));
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) + (3 % 5));
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) + (3 % 2));
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) + (3 % 17));
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) + (3 % 11));
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) + (3 % 7));
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) + (3 % 3));
                if (monkey3Array[itemNumber] % 2 === 0) {
                    indexArray[1].push(itemNumber);
                } else {
                    indexArray[2].push(itemNumber);
                }
                inspectCounter[3]++;
            } else if (j === 4) { // multiply by itself, check divisible by 17
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) * (monkey0Array[itemNumber] % 13)) % 13;
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) * (monkey1Array[itemNumber] % 19)) % 19;
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) * (monkey2Array[itemNumber] % 5)) % 5;
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) * (monkey3Array[itemNumber] % 2)) % 2;
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) * (monkey4Array[itemNumber] % 17)) % 17;
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) * (monkey5Array[itemNumber] % 11)) % 11;
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) * (monkey6Array[itemNumber] % 7)) % 7;
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) * (monkey7Array[itemNumber] % 3)) % 3;
                if (monkey4Array[itemNumber] === 0) {
                    indexArray[6].push(itemNumber);
                } else {
                    indexArray[0].push(itemNumber);
                }
                inspectCounter[4]++;
            } else if (j === 5) { // add 8, check divisible by 11
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) + (8 % 13));
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) + (8 % 19));
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) + (8 % 5));
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) + (8 % 2));
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) + (8 % 17));
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) + (8 % 11));
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) + (8 % 7));
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) + (8 % 3));
                if (monkey5Array[itemNumber] % 11 === 0) {
                    indexArray[4].push(itemNumber);
                } else {
                    indexArray[6].push(itemNumber);
                }
                inspectCounter[5]++;
            } else if (j === 6) { // add 2, check divisible by 7
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) + (2 % 13));
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) + (2 % 19));
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) + (2 % 5));
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) + (2 % 2));
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) + (2 % 17));
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) + (2 % 11));
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) + (2 % 7));
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) + (2 % 3));
                if (monkey6Array[itemNumber] % 7 === 0) {
                    indexArray[3].push(itemNumber);
                } else {
                    indexArray[0].push(itemNumber);
                }
                inspectCounter[6]++;
            } else if (j === 7) { // add 4, check divisible by 3
                monkey0Array[itemNumber] = ((monkey0Array[itemNumber] % 13) + (4 % 13));
                monkey1Array[itemNumber] = ((monkey1Array[itemNumber] % 19) + (4 % 19));
                monkey2Array[itemNumber] = ((monkey2Array[itemNumber] % 5) + (4 % 5));
                monkey3Array[itemNumber] = ((monkey3Array[itemNumber] % 2) + (4 % 2));
                monkey4Array[itemNumber] = ((monkey4Array[itemNumber] % 17) + (4 % 17));
                monkey5Array[itemNumber] = ((monkey5Array[itemNumber] % 11) + (4 % 11));
                monkey6Array[itemNumber] = ((monkey6Array[itemNumber] % 7) + (4 % 7));
                monkey7Array[itemNumber] = ((monkey7Array[itemNumber] % 3) + (4 % 3));
                if (monkey7Array[itemNumber] % 3 === 0) {
                    indexArray[4].push(itemNumber);
                } else {
                    indexArray[5].push(itemNumber);
                }
                inspectCounter[7]++;
            }
            if (k === (numberOfItems - 1)) {
                indexArray[j] = [];
            }
        }
    }
}
// find max and secondMax in inspectCounter
let max = 0;
let secondMax = 0;
for (let i = 0; i < inspectCounter.length; i++) {
    if (inspectCounter[i] > secondMax) {
        if (inspectCounter[i] > max) {
            secondMax = max;
            max = inspectCounter[i];
        } else {
            secondMax = inspectCounter[i];
        }
    }
}
console.log(max * secondMax);