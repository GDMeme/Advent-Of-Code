const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const directionArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];


function flash (frontier, flashed, counter) {
    while (frontier.length !== 0) {
        counter++;
        let [x, y] = frontier.shift().split(',').map(coordinate => parseInt(coordinate));
        flashed.add(x + ',' + y);
        for (const [directionX, directionY] of directionArray) {
            const newCoordinateX = x + directionX;
            const newCoordinateY = y + directionY;
            if (newCoordinateX < 0) {
                continue;
            }
            if (newCoordinateX >= arr[y].length) {
                continue;
            }
            if (newCoordinateY < 0) {
                continue;
            }
            if (newCoordinateY >= arr.length) {
                continue;
            }
            if (parseInt(arr[newCoordinateY][newCoordinateX]) === 9) {
                if (!flashed.has(newCoordinateX + ',' + newCoordinateY)) {
                    if (!frontier.includes(newCoordinateX + ',' + newCoordinateY)) {
                        frontier.push(newCoordinateX + ',' + newCoordinateY);
                    }
                }
            } else {
                arr[newCoordinateY] = setCharAt(arr[newCoordinateY], newCoordinateX, (parseInt(arr[newCoordinateY][newCoordinateX]) + 1).toString());
            }

        }
    }
    return counter;
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

let counter = 0;

for (let rounds = 0; rounds < 100; rounds++) {
    let flashed = new Set();
    let frontier = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            let currentNumber = parseInt(arr[i][j]);
            if (currentNumber === 9) {
                frontier.push(j + ',' + i);
            }
        }
    }
    for (let i = 0; i < arr.length; i++) { // increment them all at the same time, then check for flashes
        for (let j = 0; j < arr[i].length; j++) {
            let currentNumber = parseInt(arr[i][j]);
            if (currentNumber !== 9) {
                arr[i] = setCharAt(arr[i], j, (currentNumber + 1).toString());
            }
        }
    }
    counter = flash(frontier, flashed, counter);
    for (const elem of flashed) {
        const [x, y] = elem.split(',').map(coordinate => parseInt(coordinate));
        arr[y] = setCharAt(arr[y], x, '0');
    }
}
console.log('ans:', counter);