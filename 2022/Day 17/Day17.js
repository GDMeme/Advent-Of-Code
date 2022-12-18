const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

// each rock appears with its left edge 2 units away from the left wall

// bottom edge appears 3 units above the highest rock (or the floor)

// 5 rocks, repeat

// if end of input is reached, repeat

// spawns, then is pushed by air, then drops, then pushed, etc. 


// instructions

// just put the first rock down on the ground

// make sure the height is tall enough to spawn the rock (just use 3 above highest column height?)

// push rock (air)

// check if hit bottom/another rock
// keep track of bottom height of rock, when hit bottom/another rock, increase height based on highest height of rock

// if didn't hit anything, move rock down one

// if hit something, increase height of corresponding columns

function doWindPush(windCounter, rockArray) {
    let currentWindDirection = arr[0][windCounter];
    console.log('currentWindDirection', currentWindDirection);
    if (currentWindDirection === '<') {
        if (Math.min(...rockArray) > 0) {
            rockArray = rockArray.map(rock => rock - 1);
        }
    } else {
        if (Math.max(...rockArray) < 7) {
            rockArray = rockArray.map(rock => rock + 1);
        }
    }
    console.log('rockArray:', rockArray);
    return rockArray;
}

const numberOfRocks = 2;

let columnHeights = [0, 0, 0, 0, 0, 0, 0];

let windCounter = 0;
for (let i = 0; i < numberOfRocks; i++) {
    let hitBottom = false;
    let bottomRockHeight = Math.max(...columnHeights) + 3;
    if (i % 5 === 0) { // rock is ####
        let rockArray = [2, 3, 4, 5];
        // probably need rockHeightArray for the other shapes
        while (!hitBottom) {
            rockArray = doWindPush(windCounter, rockArray);
            windCounter++;
            for (let j = 0; j < rockArray.length; j++) { // check if any part of the rock hit another rock
                if (columnHeights[rockArray[j]] + 1 === bottomRockHeight) { // rockHeightArray for future rocks
                    hitBottom = true;
                    for (let k = 0; k < rockArray.length; k++) { // update columnHeights
                        columnHeights[rockArray[k]] = bottomRockHeight;
                    }
                    break;
                }
            }
            bottomRockHeight--;
        }                             // .#.
    } else if (i % 5 === 1) { // rock is ###
        let rockArray = [2, 3, 4];    // .#. account for rockArray[0] and rockArray[2] being 1 block higher than rockArray[1]
        let rockHeightArray = [bottomRockHeight + 1, bottomRockHeight, bottomRockHeight + 1]; // keeps track of the bottom side of the rock
        while (!hitBottom) {
            console.log('rockHeightArray', rockHeightArray);
            console.log('windCounter is:', windCounter);
            rockArray = doWindPush(windCounter, rockArray);
            windCounter++;
            for (let j = 0; j < rockArray.length; j++) {
                if (columnHeights[rockArray[j]] + 1 === rockHeightArray[j]) {
                    hitBottom = true;
                    for (let k = 0; k < rockArray.length; k++) { // update columnHeights
                        if (k === 0 || k === 2) {
                            columnHeights[rockArray[k]] = rockHeightArray[k];
                        } else {
                            columnHeights[rockArray[k]] = rockHeightArray[k] + 2;
                        }

                    }
                    break;
                }
            }
            rockHeightArray = rockHeightArray.map(height => height - 1);
        }
    }
    console.log(columnHeights);
    console.log(windCounter);
}
