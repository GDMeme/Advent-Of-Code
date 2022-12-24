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

let counter = 0;
let roundCounter = 0;
let newElfPosition = [];

const directionArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
while(true) { // some number of rounds
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
                } else if (tempCounter % 4 === 1) { // try moving south
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
            let oldElfPosition = newElfPosition[possibleDuplicate].oldValue;
            realNewElfPosition[possibleDuplicate] = {oldValue: oldElfPosition, newValue: oldElfPosition}
            oldElfPosition = newElfPosition[i].oldValue;
            realNewElfPosition[i] = {oldValue: oldElfPosition, newValue: oldElfPosition};
        } else {
            realNewElfPosition.push(newElfPosition[i]);
        }
        tempArray.push(newElfPosition[i].newValue);
    }
    tempArray.length = 0;
    currentElfPosition = cloneDeep(realNewElfPosition);
    counter++;
    counter = counter % 4;
    roundCounter++;
    if (roundCounter % 100 === 0) {
        console.log('round is', roundCounter);
    }
    let notEqual = false;
    for (let j = 0; j < newElfPosition.length; j++) {
        if (newElfPosition[j].oldValue === newElfPosition[j].newValue) {
            continue;
        } else {
            notEqual = true;
            break;
        }
    }
    if (!notEqual) {
        break;
    }
    newElfPosition.length = 0;
} 

console.log('ans:', roundCounter);

const t1 = performance.now();

console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);