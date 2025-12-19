const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let totalScoreArray = [];

for (const expression of arr) {
    let corrupted = false;
    const arrCompare = [];
    for (let i = 0; i < expression.length; i++) {
        let currentChar = expression[i];
        if (currentChar !== ')' && currentChar !== ']' && currentChar !== '}' && currentChar !== '>') {
            arrCompare.push(currentChar);
        } else {
            if (currentChar === ')') {
                if (arrCompare[arrCompare.length - 1] === '(') {
                    arrCompare.pop();
                    continue;
                } else {
                    corrupted = true;
                    break;
                }
            } else if (currentChar === ']') {
                if (arrCompare[arrCompare.length - 1] === '[') {
                    arrCompare.pop();
                    continue;
                } else {
                    corrupted = true;
                    break;
                }
            } else if (currentChar === '}') {
                if (arrCompare[arrCompare.length - 1] === '{') {
                    arrCompare.pop();
                    continue;
                } else {
                    corrupted = true;
                    break;
                }
            } else if (currentChar === '>') {
                if (arrCompare[arrCompare.length - 1] === '<') {
                    arrCompare.pop();
                    continue;
                } else {
                    corrupted = true;
                    break;
                }
            }
        }
    }
    if (!corrupted) {
        let totalScore = 0;
        for (let i = arrCompare.length - 1; i >= 0; i--) {
            totalScore *= 5;
            if (arrCompare[i] === '(') {
                totalScore += 1;
            } else if (arrCompare[i] === '[') {
                totalScore += 2;
            } else if (arrCompare[i] === '{') {
                totalScore += 3;
            } else {
                totalScore += 4;
            }
        }
        totalScoreArray.push(totalScore);
    }
}

totalScoreArray.sort(function(a, b) {
    return a - b;
  });

console.log(totalScoreArray[(totalScoreArray.length - 1) / 2]);