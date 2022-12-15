const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

for (let i = 0; i < arr.length; i++) { // convert it to an actual array
    if (arr[i] === '') {
        continue;
    } else {
        arr[i] = JSON.parse(arr[i]);
    }
}

/**
 * Returns -1 if first < second, 0 if first == second, and 1 if first > second.
 * @param {number | [number]} first 
 * @param {number | [number]} second 
 */
function compare(first, second) {
    const [firstIsArray, secondIsArray] = [first, second].map(item => Array.isArray(item));
    if (firstIsArray) {
        if (secondIsArray) {
            for (let i = 0; i < Math.min(first.length, second.length); i++) {
                const result = compare(first[i], second[i]);
                if (result !== 0) {
                    return result;
                }
            }
            const d = first.length - second.length;
            if (d === 0) {
                return 0;
            }
            return d / Math.abs(d);
        }
        // First is array, second is int
        else {
            return compare(first, [second]);
        }
    }
    // First is int
    else {
        if (secondIsArray) {
            return compare([first], second);
        }
        // First is int, second is int
        else {
            if (first > second) {
                return 1;
            } else if (first === second) {
                return 0;
            } else {
                return -1;
            }
        }
    }
}

// function comparisonAlgorithm(firstValue, secondValue, index, j) { // duplicates are going into newOrder
//     //console.log('firstValue', firstValue, 'secondValue', secondValue);
//     if (!Array.isArray(firstValue[j]) && !Array.isArray(secondValue[j])) { // both integers, also so that I can go one deeper level
//         //console.log('firstValue[j]:', firstValue[j]);
//         //console.log('secondValue[j]', secondValue[j]);
//         if (compareBothIntegers(firstValue[j], secondValue[j], index)) {
//             //console.log('i got here');
//             solved = true;
//             return;
//         } else {
//             if (j === firstValue.length - 1) { // hit end of element, increment j
//                 //console.log('yep');
//                 return;
//             }
//             ////console.log('i was here')
//         }
//     } else if (!(Array.isArray(firstValue[j]) && Array.isArray(secondValue[j]))) { // one is a list, one is an integer
//         if (!Array.isArray(firstValue[j])) { // left is an integer
//             let newFirstValue = cloneDeep(firstValue);
//             newFirstValue[j] = [firstValue[j]];
//             comparisonAlgorithm(newFirstValue, secondValue, index, j);
//         } else {
//             //console.log('i got hereee');
//             let newSecondValue = cloneDeep(secondValue);
//             newSecondValue[j] = [secondValue[j]];
//             comparisonAlgorithm(firstValue, newSecondValue, index, j);
//         }
//     } else { // both lists
//         if (checkEmptyList(firstValue[j], secondValue[j] >= 0)) { // i dont think this ever executes ?
//             solved = true;
//             return;
//         } else if (checkEmptyList(firstValue[j], secondValue[j] === -1)) { // increment j
//             return;
//         } else {
//             let firstComparisonArray = firstValue[j]; // [[[],[],8,3],[10]]
//             let secondComparisonArray = secondValue[j];
//             // need a for loop here to increment the nested level index
//             let shorterArraySize = firstComparisonArray.length > secondComparisonArray.length ? secondComparisonArray.length : firstComparisonArray.length;
//             for (let k = 0; k < shorterArraySize; k++) {
//                 comparisonAlgorithm(firstValue[j], secondValue[j], index, 0)
//                 if (solved) {
//                     break;
//                 }
//             }
//             if (solved) {
//                 return;
//             }
//             // only get here if the shorter array runs out 
//             // ^ is wrong, [1] and [1] will reach here, but both arrays could have more elements after this

//             // maybe this code works?
//             if (firstComparisonArray.length === shorterArraySize && firstComparisonArray.length < secondComparisonArray.length) {
//                 //console.log('im gonna push here');
//                 rightOrder.push((index / 3) + 1);
//             }
//         }
//     }
// }

let rightOrder = []; // keeps track of the indices of pairs that are already in the right order
for (let i = 0; i < arr.length; i += 3) {
    let firstComparisonArray = arr[i]; // [[[],[],8,3],[10]]
    let secondComparisonArray = arr[i + 1];
    let returnValue = compare(firstComparisonArray, secondComparisonArray);
    // Returns -1 if first < second, 0 if first == second, and 1 if first > second.
    // need a for loop here to increment the top level index
    if (returnValue === -1) {
        rightOrder.push((i / 3) + 1);
        continue;
    } else if (returnValue === 1) {
        continue;
    }
    // if (!solved) { // maybe this works??
    //     if (firstComparisonArray.length === shorterArraySize && firstComparisonArray.length < secondComparisonArray.length) {
    //     //console.log('im gonna push here');
    //     rightOrder.push((i / 3) + 1);
    //     }
    // }
}

let sum = 0; 
for (let i = 0; i < rightOrder.length; i++) {
    sum += rightOrder[i];
}
console.log('sum is:', sum);
