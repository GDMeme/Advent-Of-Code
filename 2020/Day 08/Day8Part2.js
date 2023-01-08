const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const nopSet = new Set();
const jmpSet = new Set();

for (let i = 0; i < arr.length; i++) {
    if (arr[i].split(' ')[0] === 'nop') {
        nopSet.add(i);
    } else if (arr[i].split(' ')[0] === 'jmp') {
        jmpSet.add(i);
    }
}

for (const index of nopSet) {
    const visited = new Set();
    const newArr = cloneDeep(arr);
    const oldValue = arr[index].split(' ')[1];
    newArr[index] = 'jmp ' + oldValue;
    let accumulator = 0;
    for (let i = 0; i < newArr.length; i++) {
        if (i === 632) {
            console.log(accumulator);
            break;
        }
        if (!visited.has(i)) {
            visited.add(i);
        } else { // FOUND IT
            break;
        }
        const [instruction, value] = newArr[i].split(' ');
        if (instruction === 'nop') {
            continue;
        } else if (instruction === 'acc') {
            if (value[0] === '+') {
                accumulator += parseInt(value.slice(1));
            } else {
                accumulator -= parseInt(value.slice(1));
            }
        } else if (instruction === 'jmp') {
            if (value[0] === '+') {
                i += parseInt(value.slice(1)) - 1;
            } else {
                i -= parseInt(value.slice(1)) + 1;
            }
        }
    }
}

for (const index of jmpSet) {
    const visited = new Set();
    const newArr = cloneDeep(arr);
    const oldValue = arr[index].split(' ')[1];
    newArr[index] = 'nop ' + oldValue;
    let accumulator = 0;
    for (let i = 0; i < newArr.length; i++) {
        if (i === 632) {
            console.log(accumulator);
            break;
        }
        if (!visited.has(i)) {
            visited.add(i);
        } else { // FOUND IT
            break;
        }
        const [instruction, value] = newArr[i].split(' ');
        if (instruction === 'nop') {
            continue;
        } else if (instruction === 'acc') {
            if (value[0] === '+') {
                accumulator += parseInt(value.slice(1));
            } else {
                accumulator -= parseInt(value.slice(1));
            }
        } else if (instruction === 'jmp') {
            if (value[0] === '+') {
                i += parseInt(value.slice(1)) - 1;
            } else {
                i -= parseInt(value.slice(1)) + 1;
            }
        }
    }
}