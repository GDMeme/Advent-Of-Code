const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let firstPlayerCurrentPosition = parseInt(arr[0].split(': ')[1]);
let secondPlayerCurrentPosition = parseInt(arr[1].split(': ')[1]);

let firstPlayerScore = 0;
let secondPlayerScore = 0;

let currentDiceCounter = 1;
let firstPlayerTurn = true;

let roundCounter = 0;

while (true) {
    let currentSum = 0;
    if (currentDiceCounter > 98) {
        for (let i = 0; i < 3; i++) {
            if (currentDiceCounter > 100) {
                currentDiceCounter = 1;
            }
            currentSum += currentDiceCounter;
            currentDiceCounter++;
        }
        currentDiceCounter -= 3;
    } else {
        currentSum = currentDiceCounter * 3 + 3;
    }
    // console.log('current sum', currentSum);
    if (firstPlayerTurn) {
        firstPlayerCurrentPosition += currentSum;
        firstPlayerCurrentPosition = firstPlayerCurrentPosition % 10;
        if (firstPlayerCurrentPosition === 0) {
            firstPlayerCurrentPosition = 10;
        }
        firstPlayerScore += firstPlayerCurrentPosition;
        firstPlayerTurn = false;
    } else {
        secondPlayerCurrentPosition += currentSum;
        secondPlayerCurrentPosition = secondPlayerCurrentPosition % 10;
        if (secondPlayerCurrentPosition === 0) {
            secondPlayerCurrentPosition = 10;
        }
        secondPlayerScore += secondPlayerCurrentPosition;
        firstPlayerTurn = true;
    }
    roundCounter++;
    if (firstPlayerScore >= 1000 || secondPlayerScore >= 1000) {
        break;
    }

    currentDiceCounter += 3;
    if (currentDiceCounter > 100) {
        currentDiceCounter = currentDiceCounter % 100;
    }
    // console.log('firstscore', firstPlayerScore);
    // console.log('secondscore', secondPlayerScore);
}


if (firstPlayerScore >= 1000) {
    console.log(secondPlayerScore * roundCounter * 3);
} else {
    console.log(firstPlayerScore * roundCounter * 3);
}