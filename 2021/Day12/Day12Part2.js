// run it normally, for each small cave, send a parameter to continuePath which lets you visit that specific small cave twice

// add the paths to a set so no duplicates, then get the size of the set rather than incrementing a counter whenever you see "end"

const {readFileSync, promises: fsPromises} = require('fs');

const {cloneDeep} = require('lodash');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

function initializePaths(first, second) {
    if (second !== 'start') {
        if (pathArray.some(elem => elem.key === first)) {
            pathArray[pathArray.findIndex(elem => elem.key === first)].value.push(second);
        } else {
            if (first !== 'end') {
                pathArray.push({key: first, value: [second]});
            }
        }
    }
    if (!(first.toUpperCase() === first) && first !== 'end' && first !== 'start') {
        smallCave.add(first);
    }
}

function continuePath(input, visited, currentPath, duplicateValue, used) {
    if (!(input.toUpperCase() === input) && input !== 'start' && input !== 'end') {
        visited.add(input);
    }
    let currentIndex = pathArray.findIndex(elem => elem.key === input);
    for (const value of pathArray[currentIndex].value) {
        const newVisited = cloneDeep(visited);
        const newPath = cloneDeep(currentPath);
        if (value === 'end') {
            newPath.push(value);
            const newPathString = newPath.join();
            allPaths.add(newPathString);
            continue;
        }
        if (!visited.has(value)) {
            newPath.push(value);
            continuePath(value, newVisited, newPath, duplicateValue, used);
            continue;
        }
        if (value === duplicateValue && used === false) {
            newPath.push(value);
            continuePath(value, newVisited, newPath, duplicateValue, true)
        }
    }
}

const pathArray = [];

const allPaths = new Set();

const smallCave = new Set();

for (const item of arr) {
    const [firstConnection, secondConnection] = item.split('-');
    initializePaths(firstConnection, secondConnection);
    initializePaths(secondConnection, firstConnection);
}

for (const item of smallCave) {
    continuePath('start', new Set(), ['start'], item, false);
}

console.log('ans:', allPaths.size);