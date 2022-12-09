const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function isTouching (headX, headY, tailX, tailY) {
    if (headY === tailY) { // adjacent horizontally (includes overlapping)
        if ((headX === tailX + 1) || (headX === tailX) || (headX === tailX - 1)) {
            return true;
        } else {
            return false;
        }
    } else if (headX === tailX) { // adjacent vertically (don't need to check overlap)
        if ((headY === tailY + 1) || (headY === tailY - 1)) {
            return true;
        } else {
            return false;
        }
    } else if (((headY === tailY + 1) || (headY === tailY - 1)) && ((headX === tailX + 1) || (headX === tailX - 1))) { // adjacent diagonally
        return true;
    } else {
        return false;
    }
}

function newTailPosition(headX, headY, tailX, tailY) { // check 4 diagonals, check if any of them end up with isTouching true
    let newTailX = tailX + 1; // check top right diagonal
    let newTailY = tailY - 1;
    if (isTouching(headX, headY, newTailX, newTailY)) {
        return `${newTailX} ${newTailY}`;
    } else {
        newTailX = tailX - 1; // check top left diagonal
        newTailY = tailY - 1;
        if (isTouching(headX, headY, newTailX, newTailY)) {
            return `${newTailX} ${newTailY}`;
        } else {
            newTailX = tailX - 1; // check bottom left diagonal
            newTailY = tailY + 1;
            if (isTouching(headX, headY, newTailX, newTailY)) {
                return `${newTailX} ${newTailY}`;
            } else { // must be bottom right diagonal
                return `${tailX + 1} ${tailY + 1}`
            }
        }
    }
}

function moveTail (headX, headY, tailX, tailY) { // will only get called if not touching, check all possible 2 spaces away
    if ((headX === tailX + 2) || (headX === tailX - 2)) {
        if (headY === tailY + 1) {
            return newTailPosition(headX, headY, tailX, tailY);
        } else if (headY === tailY - 1) {
            return newTailPosition(headX, headY, tailX, tailY);
        } else if (headY === tailY)  {
            if (headX === tailX + 2) {
                return `${headX - 1} ${headY}`
            } else {
                return `${headX + 1} ${headY}`
            }
        } else {
            throw new Error('how??2')
        }
    } else if ((headY === tailY + 2) || (headY === tailY - 2)) {
        if (headX === tailX + 1) {
            return newTailPosition(headX, headY, tailX, tailY);
        } else if (headX === tailX - 1) {
            return newTailPosition(headX, headY, tailX, tailY);
        } else if (headX === tailX) {
            if (headY === tailY + 2) {
                return `${headX} ${headY - 1}`
            } else {
                return `${headX} ${headY + 1}`
            }
        } else {
            throw new Error('how??3')
        }
    } else {
        throw new Error('how??4')
    }
}

let headX = 0; // 0 1 2 3 4 going right
let headY = 0; // 0 1 2 3 4 going down
let tailX = 0;
let tailY = 0;
let arrVisited = [[]];
for (let i = 0; i < arr.length; i++) { // check if going out of bounds
    if (arr[i].split(' ')[0] === 'U') { // up
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headY -= 1;
            if (headY === -1) {
                arrVisited.unshift([]);
                headY = 0;
                tailY += 1; // shift everything down
            }
            if (isTouching(headX, headY, tailX, tailY)) {
                continue;
            } else { // move tail
                let temp = moveTail(headX, headY, tailX, tailY); // will return 'x y' where x is new tailX and y is new tailY
                tailX = parseInt(temp.split(' ')[0]);
                tailY = parseInt(temp.split(' ')[1]);
                arrVisited[tailY][tailX] = true;
            }
        }
    } else if (arr[i].split(' ')[0] === 'L') { // left
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headX -= 1;
            if (headX === -1) {
                for (let k = 0; k < arrVisited.length; k++) {
                    arrVisited[k].unshift('');
                }
                headX = 0;
                tailX += 1; // shift everything right
            }
            if (isTouching(headX, headY, tailX, tailY)) {
                continue;
            } else { // move tail
                let temp = moveTail(headX, headY, tailX, tailY); // will return 'x y' where x is new tailX and y is new tailY
                tailX = parseInt(temp.split(' ')[0]);
                tailY = parseInt(temp.split(' ')[1]);
                arrVisited[tailY][tailX] = true;
            }
        }
    } else if (arr[i].split(' ')[0] === 'R') { // right
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headX += 1;
            if (isTouching(headX, headY, tailX, tailY)) {
                continue;
            } else { // move tail
                let temp = moveTail(headX, headY, tailX, tailY); // will return 'x y' where x is new tailX and y is new tailY
                tailX = parseInt(temp.split(' ')[0]);
                tailY = parseInt(temp.split(' ')[1]);
                arrVisited[tailY][tailX] = true;
            }
        }
    } else { // down
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headY += 1;
            if (headY === arrVisited.length) {
                arrVisited.push([]);
            }
            if (isTouching(headX, headY, tailX, tailY)) {
                continue;
            } else { // move tail
                let temp = moveTail(headX, headY, tailX, tailY); // will return 'x y' where x is new tailX and y is new tailY
                tailX = parseInt(temp.split(' ')[0]);
                tailY = parseInt(temp.split(' ')[1]);
                arrVisited[tailY][tailX] = true;
            }
        }
    }
    if (i === 10) {
        break;
    }
}
let counter = 0;
for (let i = 0; i < arrVisited.length; i++) {
    for (let j = 0; j < arrVisited[i].length; j++) {
        if (arrVisited[i][j] === true) {
            counter++;
        }
    }
}
console.log('# of positions', counter);