const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

arr = syncReadFile('./input.txt');

let [temp, temp2, yValues] = arr[0].split('=');

minY = parseInt(yValues.split('..')[0]);

console.log((-minY - 1) * -minY / 2);