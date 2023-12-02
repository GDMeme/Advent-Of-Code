const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function evaluateExpression(expression) {
    const expressionArray = expression.split(' ');
    let i = 1;
    let ans = parseInt(expressionArray[0]);
    while (i < expressionArray.length) {
        if (expressionArray[i] === '+') {
            ans += parseInt(expressionArray[i + 1]);
        } else {
            ans *= parseInt(expressionArray[i + 1]);
        }
        i += 2;
    }
    return ans;
}

let sum = 0;

for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === ')') {
            const startingIndex = arr[i].lastIndexOf('(', j);
            const stringBefore = arr[i].slice(0, startingIndex);
            const stringAfter = arr[i].slice(j + 1);
            const expression = arr[i].slice(startingIndex + 1, j);
            arr[i] = stringBefore + evaluateExpression(expression) + stringAfter;
            j = 0;
        }
    }
    sum += parseInt(evaluateExpression(arr[i]));
}

console.log(sum);