const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let max = 0;
for (let i = 1; i < arr.length - 1; i++) { // ignore edges since those will be 0
    for (let j = 1; j < arr[i].length - 1; j++) {
        let scenicScore = 0;
        upDistance = 0;
        leftDistance = 0;
        rightDistance = 0;
        downDistance = 0;
        for (let k = i - 1; k >= 0; k--) { // calculating upDistance
            if (arr[k][j] < arr[i][j]) {
                upDistance++;
            } else if (arr[k][j] >= arr[i][j]) {
                upDistance++;
                break;
            }
        }
        for (let k = j - 1; k >= 0; k--) { // calculating leftDistance
            if (arr[i][k] < arr[i][j]) {
                leftDistance++;
            } else if (arr[i][k] >= arr[i][j]) {
                leftDistance++;
                break;
            }
        }
        for (let k = j + 1; k < arr[i].length; k++) { // calculating rightDistance
            if (arr[i][k] < arr[i][j]) {
                rightDistance++;
            } else if (arr[i][k] >= arr[i][j]) {
                rightDistance++;
                break;
            }
        }
        for (let k = i + 1; k < arr.length; k++) { // calculating downDistance
            if (arr[k][j] < arr[i][j]) {
                downDistance++;
            } else if (arr[k][j] >= arr[i][j]) {
                downDistance++;
                break;
            }
        }
        scenicScore = upDistance * leftDistance * rightDistance * downDistance;
        if (scenicScore > max) {
            max = scenicScore;
        }
    }
}
console.log('max is:', max);