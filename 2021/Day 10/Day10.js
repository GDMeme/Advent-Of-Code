const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let sum = 0;
for (const expression of arr) {
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
                    sum += 3;
                    break;
                }
            } else if (currentChar === ']') {
                if (arrCompare[arrCompare.length - 1] === '[') {
                    arrCompare.pop();
                    continue;
                } else {
                    sum += 57;
                    break;
                }
            } else if (currentChar === '}') {
                if (arrCompare[arrCompare.length - 1] === '{') {
                    arrCompare.pop();
                    continue;
                } else {
                    sum += 1197;
                    break;
                }
            } else if (currentChar === '>') {
                if (arrCompare[arrCompare.length - 1] === '<') {
                    arrCompare.pop();
                    continue;
                } else {
                    sum += 25137;
                    break;
                }
            }
        }
    }
}

console.log('ans:', sum);