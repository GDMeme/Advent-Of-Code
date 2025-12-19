const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// 3: 1 possibility
// 4: 3 possibilities
// 5: 6 possibilities
// 6: 7 possibliities
// 7: 6 possibilities
// 8: 3 possibilities
// 9: 1 possibility

const t0 = performance.now();

const possibilityArray = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];

let firstPlayerCurrentPosition = parseInt(arr[0].split(': ')[1]);
let secondPlayerCurrentPosition = parseInt(arr[1].split(': ')[1]);

let firstPlayerWinCounter = 0;
let secondPlayerWinCounter = 0;

const frontier = [{firstPlayerCurrentPosition, secondPlayerCurrentPosition, firstPlayerScore: 0, secondPlayerScore: 0, duplicateGames: 1, firstPlayerTurn: true}]
findAllOutcomes();

const t1 = performance.now();

console.log('first', firstPlayerWinCounter);
console.log('second', secondPlayerWinCounter);

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);


function findAllOutcomes() {
    while (frontier.length !== 0) {
        const currentObject = frontier.shift();
        const { firstPlayerCurrentPosition, secondPlayerCurrentPosition, firstPlayerScore, secondPlayerScore, duplicateGames, firstPlayerTurn } = currentObject;
        if (firstPlayerScore >= 21) {
            firstPlayerWinCounter += duplicateGames;
            continue;
        }
        if (secondPlayerScore >= 21) {
            secondPlayerWinCounter += duplicateGames;
            continue;
        }
        if (firstPlayerTurn) {
            for (const possibility of possibilityArray) {
                const [diceRoll, numberOfPossibilities] = possibility;
                let newPosition = firstPlayerCurrentPosition + diceRoll;
                if (newPosition > 10) {
                    newPosition = newPosition % 10;
                }
                let newDuplicateGames = duplicateGames * numberOfPossibilities;
                let newScore = firstPlayerScore + newPosition;
                frontier.push({newPosition, secondPlayerCurrentPosition, newScore, secondPlayerScore, newDuplicateGames, firstPlayerTurn: false});
            }
        } else {
            for (const possibility of possibilityArray) {
                const [diceRoll, numberOfPossibilities] = possibility;
                let newPosition = secondPlayerCurrentPosition + diceRoll;
                if (newPosition > 10) {
                    newPosition = newPosition % 10;
                }
                let newDuplicateGames = duplicateGames * numberOfPossibilities;
                let newScore = secondPlayerScore + newPosition;
                frontier.push({firstPlayerCurrentPosition, newPosition, firstPlayerScore, newScore, newDuplicateGames, firstPlayerTurn: true});
            }
        }
    }
}