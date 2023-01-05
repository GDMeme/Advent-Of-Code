const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt').map(e => parseInt(e));

let breakOuter = false;

for (let i = 0; i < arr.length - 2; i++) {
    if (breakOuter) {
        break;
    }
    for (let j = 0; j < arr.length - 1; j++) {
        if (breakOuter) {
            break;
        }
        if (i === j) {
            continue;
        }
        for (let k = 0; k < arr.length; k++) {
            if (i === k || j === k) {
                continue;
            }
            if (arr[i] + arr[j] + arr[k] === 2020) {
                console.log(arr[i] * arr[j] * arr[k]);
                breakOuter = true;
                break;
            }
        }

    }
}