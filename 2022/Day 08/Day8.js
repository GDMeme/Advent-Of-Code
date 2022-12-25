const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const width = arr[0].length;
const height = arr.length;
let counter = 0;

for (let i = 1; i < arr.length - 1; i++) { // loop through rows
    for (let j = 1; j < arr[i].length - 1; j++) { // loop through each character
        let visible = false;
        for (let k = i - 1; k >= 0; k--) { // check going up
            if (arr[k][j] < arr[i][j]) {
                if (k === 0) {
                    visible = true;
                    break;
                }
            } else {
                break;
            }
        }
        for (let k = j - 1; k >= 0; k--) { // check left side
            if (visible) {
                break;
            }
            if (arr[i][k] < arr[i][j]) {
                if (k === 0) {
                    visible = true;
                    break;
                }
            } else {
                break;
            }
        }
        for (let k = j + 1; k < arr[i].length; k++) { // check right side
            if (visible) {
                break;
            }
            if (arr[i][k] < arr[i][j]) {
                if (k === arr[i].length - 1) {
                    visible = true;
                    break;
                }
            } else {
                break;
            }
        }
        for (let k = i + 1; k < arr.length; k++) { // check going down
            if (visible) {
                break;
            }
            if (arr[k][j] < arr[i][j]) {
                if (k === arr.length - 1) {
                    visible = true;
                    break;
                }
            } else {
                break;
            }
        }
        if (visible) {
            counter++;
        }
    }
}
const outerTrees = (2 * width) + 2 * (height - 2);
console.log('visible trees', outerTrees + counter);