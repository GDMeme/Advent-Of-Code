const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const buses = arr[1].replace(/x/g, '1').split(',');

console.log(
  buses.slice(1).reduce(
    ([last, multiplier], current, i) => {
      for (let found = +last; ; found += multiplier) { // +last tries to convert last to an int, the same as parseInt
        if ((found + i + 1) % current === 0) { // apparently u can mod a string (converts to a number for you)
          return [found, multiplier*current]; // puts this back into [last, multiplier]
        }
      }
    },
    [buses[0], buses[0]] // initial value for [last, multiplier]
  )[0] // reduce() returns [last, multiplier], we want last
);