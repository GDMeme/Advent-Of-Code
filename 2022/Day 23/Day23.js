// what I am going to put in new elf position set: {key: original elf position, value: new elf position}
// change input to look like this as well, can just put key and value as the same for the initial position

// if new elf position set already has the value that you're about to put in, find and remove object of the elf with a value of the new elf position you're about to put in

// add the old elf position that you moved back to new elf position set with the key and value being the same (using the key that you found from searching for duplicate value)

// add the current elf position to new elf position with the key and value being the same

// otherwise, add the object to new elf position set normally like {key: original elf position, value: new elf position}

// if elf doesn't move cuz 8 spots around it have no elf, just add {key: original elf position, value: new elf position} with key and value being the same


// next round, just look at the value property of each object in new elf position

const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let currentElfPosition = [];
for (let i = 0; i < arr.length; i++) { // columns and rows start at 0
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === '#') {
            currentElfPosition.push({oldValue: j + ',' + i, newValue: j + ',' + i});
        }
    }
}

const t0 = performance.now();

// console.log(currentElfPosition);

let counter = 0;

let newElfPosition = [];

const directionArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
for (let i = 0; i < 10; i++) { // 10 rounds
    for (const item of currentElfPosition) {
        // check 8 directions
        let [currentElfX, currentElfY] = item.newValue.split(',').map(coordinate => parseInt(coordinate));
        let foundElf = false;
        for (const direction of directionArray) {
            const [directionX, directionY] = direction;
            const newCurrentElfX = currentElfX + directionX;
            const newCurrentElfY = currentElfY + directionY;
            if (currentElfPosition.some(current => current.newValue === (newCurrentElfX + ',' + newCurrentElfY))) {
                foundElf = true;
                break;
            }
        } 
        if (!foundElf) {
            newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: currentElfX + ',' + currentElfY});
            continue;
        } else {
            let tempCounter = counter;
            while (true) {
                if (tempCounter % 4 === 0) { // try moving north
                    const newDirectionArray = [[-1, 1], [0, 1], [1, 1]];
                    let foundElf = false;
                    for (const direction of newDirectionArray) {
                        const [directionX, directionY] = direction;
                        const newCurrentElfX = currentElfX + directionX;
                        const newCurrentElfY = currentElfY + directionY;
                        if (currentElfPosition.some(current => current.newValue === (newCurrentElfX + ',' + newCurrentElfY))) {
                            foundElf = true;
                            break;
                        }
                    }
                    if (foundElf) {
                        tempCounter++; // if failed, move on to next direction
                    } else {
                        newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: currentElfX + ',' + (currentElfY + 1)});
                        break;
                    }
                } else if (tempCounter % 4 === 1) { // try moving south
                    const newDirectionArray = [[-1, -1], [0, -1], [1, -1]];
                    let foundElf = false;
                    for (const direction of newDirectionArray) {
                        const [directionX, directionY] = direction;
                        const newCurrentElfX = currentElfX + directionX;
                        const newCurrentElfY = currentElfY + directionY;
                        if (currentElfPosition.some(current => current.newValue === (newCurrentElfX + ',' + newCurrentElfY))) {
                            foundElf = true;
                            break;
                        }
                    }
                    if (foundElf) {
                        tempCounter++; // if failed, move on to next direction
                    } else {
                        newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: currentElfX + ',' + (currentElfY - 1)});
                        break;
                    }
                } else if (tempCounter % 4 === 2) { // try moving west
                    const newDirectionArray = [[-1, -1], [-1, 0], [-1, 1]];
                    let foundElf = false;
                    for (const direction of newDirectionArray) {
                        const [directionX, directionY] = direction;
                        const newCurrentElfX = currentElfX + directionX;
                        const newCurrentElfY = currentElfY + directionY;
                        if (currentElfPosition.some(current => current.newValue === (newCurrentElfX + ',' + newCurrentElfY))) {
                            foundElf = true;
                            break;
                        }
                    }
                    if (foundElf) {
                        tempCounter++; // if failed, move on to next direction
                    } else {
                        newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: (currentElfX - 1) + ',' + currentElfY});
                        break;
                    }
                } else { // try moving east
                    const newDirectionArray = [[1, -1], [1, 0], [1, 1]];
                    let foundElf = false;
                    for (const direction of newDirectionArray) {
                        const [directionX, directionY] = direction;
                        const newCurrentElfX = currentElfX + directionX;
                        const newCurrentElfY = currentElfY + directionY;
                        if (currentElfPosition.some(current => current.newValue === (newCurrentElfX + ',' + newCurrentElfY))) {
                            foundElf = true;
                            break;
                        }
                    }
                    if (foundElf) {
                        tempCounter++; // if failed, move on to next direction
                    } else {
                        newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: (currentElfX + 1) + ',' + currentElfY});
                        break;
                    }
                }
                if (tempCounter > 7) {
                    newElfPosition.push({oldValue: currentElfX + ',' + currentElfY, newValue: currentElfX + ',' + currentElfY}); // elf checked all 4 directions and can't move
                    break;
                }
            }
        }
    }
    let tempArray = [];
    let realNewElfPosition = [];
    for (let i = 0; i < newElfPosition.length; i++) {
        const possibleDuplicate = tempArray.findIndex(current => current === newElfPosition[i].newValue);
        if (possibleDuplicate !== -1) { // found duplicate
            if (!newElfPosition[possibleDuplicate].oldValue === newElfPosition[possibleDuplicate].newValue) {
                let oldElfPosition = newElfPosition[possibleDuplicate].oldValue;
                realNewElfPosition.splice(possibleDuplicate, 1);
                realNewElfPosition.push({oldValue: oldElfPosition, newValue: oldElfPosition});
            }
            let oldElfPosition = newElfPosition[i].oldValue;
            realNewElfPosition.push({oldValue: oldElfPosition, newValue: oldElfPosition});
        } else {
            realNewElfPosition.push(newElfPosition[i]);
        }
        tempArray.push(newElfPosition[i].newValue);
    }
    tempArray.length = 0;
    currentElfPosition = cloneDeep(realNewElfPosition);
    newElfPosition.length = 0;
    counter++;
    counter = counter % 4;
} 
let maxX = Number.MIN_SAFE_INTEGER;
let maxY = Number.MIN_SAFE_INTEGER;
let minX = Number.MAX_SAFE_INTEGER;
let minY = Number.MAX_SAFE_INTEGER;
for (const item of currentElfPosition) {
    let [currentX, currentY] = item.newValue.split(',').map(number => parseInt(number));
    if (currentX > maxX) {
        maxX = currentX;
    }
    if (currentX < minX) {
        minX = currentX;
    }
    if (currentY > maxY) {
        maxY = currentY;
    }
    if (currentY < minY) {
        minY = currentY;
    }
}

const width = maxX - minX + 1;
const height = maxY - minY + 1;

console.log('ans:', (width * height) - currentElfPosition.length);

const t1 = performance.now();

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);