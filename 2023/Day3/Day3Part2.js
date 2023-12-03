const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function checkForNumber(x, y, flag) {
    if (x < 0 || y < 0 || x >= arr[0].length || y >= arr.length) {
        return 0;
    }
    if (!isNaN(arr[y][x]) && !visited.has([x, y].join())) {
        startingX = x - 1;
        endingX = x + 1;
        while (!isNaN(arr[y][startingX]) && startingX >= 0) {
            if (visited.has([startingX, y].join())) {
                return 0;
            }
            visited.add([x, y].join())
            startingX--;
        }
        startingX++;
        while (!isNaN(arr[y][endingX]) && endingX < arr[0].length) { // all rows are same length
            if (visited.has([endingX, y].join())) {
                return 0;
            }
            endingX++;
        }
        endingX--;
        let numberString = "";
        for (let i = startingX; i <= endingX; i++) {
            visited.add([x, y].join());
            numberString += arr[y][i];
        }
        if (flag) {
            return 1;
        } else {
            return Number(numberString);
        }
    }
    return 0;
}

const directionArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
let visited = new Set();
let gearCoordinates = [];
let tempCounter = 0;

for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
        if (arr[y][x] == "*") {
            tempCounter = 0;
            for (const direction of directionArray) {
                const [directionX, directionY] = direction;
                newX = x + directionX;
                newY = y + directionY;
                if (checkForNumber(newX, newY, true)) {
                    tempCounter++;
                }
            }
            if (tempCounter == 2) {
                gearCoordinates.push([x, y].join());
            }
        }
    }
}

visited.clear();
let result = 0;
let gearRatio;
let temp;

for (const coordinates of gearCoordinates) {
    [x, y] = coordinates.split(',').map(e => Number(e));
    temp = 1;
    gearRatio = 1;
    for (const direction of directionArray) {
        const [directionX, directionY] = direction;
        newX = x + directionX;
        newY = y + directionY;
        temp = checkForNumber(newX, newY, false);
        if (temp) {
            gearRatio *= temp;
        }
    }
    result += gearRatio;
}
console.log(result);