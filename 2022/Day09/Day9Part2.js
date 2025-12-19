const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function isTouching (headX1, headY1, tailX, tailY) {
    if (headY1 === tailY) { // adjacent horizontally (includes overlapping)
        if ((headX1 === tailX + 1) || (headX1 === tailX) || (headX1 === tailX - 1)) {
            return true;
        } else {
            return false;
        }
    } else if (headX1 === tailX) { // adjacent vertically (don't need to check overlap)
        if ((headY1 === tailY + 1) || (headY1 === tailY - 1)) {
            return true;
        } else {
            return false;
        }
    } else if (((headY1 === tailY + 1) || (headY1 === tailY - 1)) && ((headX1 === tailX + 1) || (headX1 === tailX - 1))) { // adjacent diagonally
        return true;
    } else {
        return false;
    }
}

function newTailPosition(headX1, headY1, tailX, tailY) { // check 4 diagonals, check if any of them end up with isTouching true
    let newTailX = tailX + 1; // check top right diagonal
    let newTailY = tailY - 1;
    if (isTouching(headX1, headY1, newTailX, newTailY)) {
        return `${newTailX} ${newTailY}`;
    } else {
        newTailX = tailX - 1; // check top left diagonal
        newTailY = tailY - 1;
        if (isTouching(headX1, headY1, newTailX, newTailY)) {
            return `${newTailX} ${newTailY}`;
        } else {
            newTailX = tailX - 1; // check bottom left diagonal
            newTailY = tailY + 1;
            if (isTouching(headX1, headY1, newTailX, newTailY)) {
                return `${newTailX} ${newTailY}`;
            } else { // must be bottom right diagonal
                return `${tailX + 1} ${tailY + 1}`
            }
        }
    }
}

function moveTail (headX1, headY1, tailX, tailY) { // will only get called if not touching, check all possible 2 spaces away
    if ((headX1 === tailX + 2) || (headX1 === tailX - 2)) {
        if (headY1 === tailY + 1) {
            return newTailPosition(headX1, headY1, tailX, tailY);
        } else if (headY1 === tailY - 1) {
            return newTailPosition(headX1, headY1, tailX, tailY);
        } else if (headY1 === tailY)  {
            if (headX1 === tailX + 2) {
                return `${headX1 - 1} ${headY1}`
            } else {
                return `${headX1 + 1} ${headY1}`
            }
        } else if (headY1 === tailY - 2 || headY1 === tailY + 2) { // specific to part 2 only, "head" could end up 2 squares away in both directions
            return newTailPosition(headX1, headY1, tailX, tailY);
        }
            else {
            throw new Error('how??2')
        }
    } else if ((headY1 === tailY + 2) || (headY1 === tailY - 2)) {
        if (headX1 === tailX + 1) {
            return newTailPosition(headX1, headY1, tailX, tailY);
        } else if (headX1 === tailX - 1) {
            return newTailPosition(headX1, headY1, tailX, tailY);
        } else if (headX1 === tailX) {
            if (headY1 === tailY + 2) {
                return `${headX1} ${headY1 - 1}`
            } else {
                return `${headX1} ${headY1 + 1}`
            }
        }  else if (headX1 === tailX - 2 || headX1 === tailX + 2) { // specific to part 2 only, "head" could end up 2 squares away in both directions
            return newTailPosition(headX1, headY1, tailX, tailY);
        } else {
            throw new Error('how??3')
        }
    } else {
        throw new Error('how??4')
    }
}

function moveAllTails () {
    let moveTail1 = moveTail(headX, headY, tailX1, tailY1); // will return 'x y' where x is new tailX and y is new tailY
    tailX1 = parseInt(moveTail1.split(' ')[0]); // RECURSION LOL
    tailY1 = parseInt(moveTail1.split(' ')[1]);
    if (!isTouching(tailX1, tailY1, tailX2, tailY2)) {
        let moveTail2 = moveTail(tailX1, tailY1, tailX2, tailY2);
        tailX2 = parseInt(moveTail2.split(' ')[0]);
        tailY2 = parseInt(moveTail2.split(' ')[1]);
        if (!isTouching(tailX2, tailY2, tailX3, tailY3)) {
            let moveTail3 = moveTail(tailX2, tailY2, tailX3, tailY3);
            tailX3 = parseInt(moveTail3.split(' ')[0]);
            tailY3 = parseInt(moveTail3.split(' ')[1]);
            if (!isTouching(tailX3, tailY3, tailX4, tailY4)) {
                let moveTail4 = moveTail(tailX3, tailY3, tailX4, tailY4);
                tailX4 = parseInt(moveTail4.split(' ')[0]);
                tailY4 = parseInt(moveTail4.split(' ')[1]);
                if (!isTouching(tailX4, tailY4, tailX5, tailY5)) {
                    let moveTail5 = moveTail(tailX4, tailY4, tailX5, tailY5);
                    tailX5 = parseInt(moveTail5.split(' ')[0]);
                    tailY5 = parseInt(moveTail5.split(' ')[1]);
                    if (!isTouching(tailX5, tailY5, tailX6, tailY6)) {
                        let moveTail6 = moveTail(tailX5, tailY5, tailX6, tailY6);
                        tailX6 = parseInt(moveTail6.split(' ')[0]);
                        tailY6 = parseInt(moveTail6.split(' ')[1]);
                        if (!isTouching(tailX6, tailY6, tailX7, tailY7)) {
                            let moveTail7 = moveTail(tailX6, tailY6, tailX7, tailY7);
                            tailX7 = parseInt(moveTail7.split(' ')[0]);
                            tailY7 = parseInt(moveTail7.split(' ')[1]);
                            if (!isTouching(tailX7, tailY7, tailX8, tailY8)) {
                                let moveTail8 = moveTail(tailX7, tailY7, tailX8, tailY8);
                                tailX8 = parseInt(moveTail8.split(' ')[0]);
                                tailY8 = parseInt(moveTail8.split(' ')[1]);
                                if (!isTouching(tailX8, tailY8, tailX9, tailY9)) {
                                    let moveTail9 = moveTail(tailX8, tailY8, tailX9, tailY9);
                                    tailX9 = parseInt(moveTail9.split(' ')[0]);
                                    tailY9 = parseInt(moveTail9.split(' ')[1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

let headX = 0; // 0 1 2 3 4 going right
let headY = 0; // 0 1 2 3 4 going down
let tailX1 = 0;
let tailY1 = 0;
let tailX2 = 0;
let tailY2 = 0;
let tailX3 = 0;
let tailY3 = 0;
let tailX4 = 0;
let tailY4 = 0;
let tailX5 = 0;
let tailY5 = 0;
let tailX6 = 0;
let tailY6 = 0;
let tailX7 = 0;
let tailY7 = 0;
let tailX8 = 0;
let tailY8 = 0;
let tailX9 = 0;
let tailY9 = 0;

let arrVisited = [[]];
for (let i = 0; i < arr.length; i++) { // check if going out of bounds
    if (arr[i].split(' ')[0] === 'U') { // up
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headY -= 1;
            if (headY === -1) {
                arrVisited.unshift([]);
                headY = 0;
                tailY1 += 1; // shift everything down
                tailY2 += 1;
                tailY3 += 1;
                tailY4 += 1;
                tailY5 += 1;
                tailY6 += 1;
                tailY7 += 1;
                tailY8 += 1;
                tailY9 += 1;
            }
            if (!isTouching(headX, headY, tailX1, tailY1)) { // move tail
                moveAllTails();  
                arrVisited[tailY9][tailX9] = true;
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
                tailX1 += 1; // shift everything right
                tailX2 += 1;
                tailX3 += 1;
                tailX4 += 1;
                tailX5 += 1;
                tailX6 += 1;
                tailX7 += 1;
                tailX8 += 1;
                tailX9 += 1;
            }
            if (!isTouching(headX, headY, tailX1, tailY1)) { // move tail
                moveAllTails();
                arrVisited[tailY9][tailX9] = true;
            }
        }
    } else if (arr[i].split(' ')[0] === 'R') { // right
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headX += 1;
            if (!isTouching(headX, headY, tailX1, tailY1)) { // move tail
                moveAllTails();
                arrVisited[tailY9][tailX9] = true;
            }
        }
    } else { // down
        for (let j = 0; j < parseInt(arr[i].split(' ')[1]); j++) {
            headY += 1;
            if (headY === arrVisited.length) {
                arrVisited.push([]);
            }
            if (!isTouching(headX, headY, tailX1, tailY1)) { // move tail
                moveAllTails();
                arrVisited[tailY9][tailX9] = true;
            }
        }
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