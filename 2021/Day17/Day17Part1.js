const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

arr = syncReadFile('./input.txt');

const minY = parseInt(arr[0].split('=')[2].split('..')[0]);

console.log((-minY - 1) * -minY / 2);