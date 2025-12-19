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
}

function continuePath(input, visited, currentPath) { // don't actually need currentPath, was just used for debugging
    if (!(input.toUpperCase() === input) && input !== 'start' && input !== 'end') {
        visited.add(input);
    }
    let currentIndex = pathArray.findIndex(elem => elem.key === input);
    for (const value of pathArray[currentIndex].value) {
        const newVisited = cloneDeep(visited);
        const newPath = cloneDeep(currentPath);
        if (value === 'end') {
            newPath.push(value);
            numberOfPaths++;
            continue;
        }
        if (!visited.has(value)) {
            newPath.push(value);
            continuePath(value, newVisited, newPath);
        }
    }
}

const pathArray = [];

let numberOfPaths = 0;

for (const item of arr) {
    const [firstConnection, secondConnection] = item.split('-');
    initializePaths(firstConnection, secondConnection);
    initializePaths(secondConnection, firstConnection);
}

continuePath('start', new Set(), ['start']);

console.log('ans:', numberOfPaths);