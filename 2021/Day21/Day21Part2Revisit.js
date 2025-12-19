const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

// 3: 1 possibility
// 4: 3 possibilities
// 5: 6 possibilities
// 6: 7 possibliities
// 7: 6 possibilities
// 8: 3 possibilities
// 9: 1 possibility

const possibilityArray = [[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]];

let firstPlayerCurrentPosition = parseInt(arr[0].split(': ')[1]);
let secondPlayerCurrentPosition = parseInt(arr[1].split(': ')[1]);

const memo = new Map();

// Unique key for memoization
function getMemoKey(p1Pos, p2Pos, p1Score, p2Score, isP1Turn) {
    return `${p1Pos},${p2Pos},${p1Score},${p2Score},${isP1Turn}`;
}

function countWins(p1Pos, p2Pos, p1Score, p2Score, isP1Turn) {
    if (p1Score >= 21) {
        return [1, 0]; // p1 wins
    }
    if (p2Score >= 21) {
        return [0, 1]; // p2 wins
    }

    const key = getMemoKey(p1Pos, p2Pos, p1Score, p2Score, isP1Turn);
    if (memo.has(key)) {
        return memo.get(key);
    }

    let p1Wins = 0;
    let p2Wins = 0;

    if (isP1Turn) {
        for (const [diceRoll, possibilities] of possibilityArray) {
            let newPos = p1Pos + diceRoll;
            if (newPos > 10) {
                newPos = newPos % 10;
            }
            const newScore = p1Score + newPos;
            const [p1, p2] = countWins(newPos, p2Pos, newScore, p2Score, false);
            p1Wins += p1 * possibilities;
            p2Wins += p2 * possibilities;
        }
    } else {
        for (const [diceRoll, possibilities] of possibilityArray) {
            let newPos = p2Pos + diceRoll;
            if (newPos > 10) {
                newPos = newPos % 10;
            }
            const newScore = p2Score + newPos;
            const [p1, p2] = countWins(p1Pos, newPos, p1Score, newScore, true);
            p1Wins += p1 * possibilities;
            p2Wins += p2 * possibilities;
        }
    }

    memo.set(key, [p1Wins, p2Wins]);
    return [p1Wins, p2Wins];
}

const [firstPlayerWinCounter, secondPlayerWinCounter] = countWins(firstPlayerCurrentPosition, secondPlayerCurrentPosition, 0, 0, true);

console.log(Math.max(firstPlayerWinCounter, secondPlayerWinCounter));