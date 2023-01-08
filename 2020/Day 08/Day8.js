const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const visited = new Set();

let accumulator = 0;

for (let i = 0; i < arr.length; i++) {
    if (!visited.has(i)) {
        visited.add(i);
    } else { // FOUND IT
        console.log(accumulator);
        break;
    }
    const [instruction, value] = arr[i].split(' ');
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