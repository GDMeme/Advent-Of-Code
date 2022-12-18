const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let points = new Set();
for (const item of arr) {
    points.add(item);
}

let emptyPocketArr = [];

for (let i = 0; i < arr.length; i++) {
    let [currentX, currentY, currentZ] = arr[i].split(',').map(number => parseInt(number));
    findEmptyPocket(currentX, currentY, currentZ);
}

method1();
method2();

function method1 () {
    let sidesNotConnectedCounter = 0;

    // part 1 code
    for (let i = 0; i < arr.length; i++) { // do part 1 on the regular input
        let [currentX, currentY, currentZ] = arr[i].split(',').map(number => parseInt(number));
        let sidesNotConnected = 6;
        let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
        for (const [x,y,z] of directionArray) {
            const newCoordinate = [currentX + x, currentY + y, currentZ + z];
            if (arr.includes(newCoordinate.join())) {
                sidesNotConnected--;
            }
        }
        sidesNotConnectedCounter += sidesNotConnected;
    }
    
    let newPoints = new Set();
    for (const emptyPocket of emptyPocketArr) {
        for (const point of emptyPocket) {
            newPoints.add(point);
        }
    }
    const arr2 = Array.from(newPoints);

    // part 1 code
    let sidesNotConnectedCounter2 = 0;

    for (let i = 0; i < arr2.length; i++) { // do part 1 on the pockets
        let [currentX, currentY, currentZ] = arr2[i].split(',').map(number => parseInt(number));
        let sidesNotConnected = 6;
        let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
        for (const [x,y,z] of directionArray) {
            const newCoordinate = [currentX + x, currentY + y, currentZ + z];
            if (arr2.includes(newCoordinate.join())) {
                sidesNotConnected--;
            }
        }
        sidesNotConnectedCounter2 += sidesNotConnected;
    }
    console.log('method 1:', sidesNotConnectedCounter - sidesNotConnectedCounter2); // subtract part 1 on pockets from part 1 on regular code
}

function method2() {
    for (const emptyPocket of emptyPocketArr) {
        for (const point of emptyPocket) {
            points.add(point);
        }
    }

    arr = Array.from(points);

    // part 1 code starts here
    let sidesNotConnectedCounter = 0;

    for (let i = 0; i < arr.length; i++) {
        let [currentX, currentY, currentZ] = arr[i].split(',').map(number => parseInt(number));
        let sidesNotConnected = 6;
        let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
        for (const [x,y,z] of directionArray) {
            const newCoordinate = [currentX + x, currentY + y, currentZ + z];
            if (arr.includes(newCoordinate.join())) {
                sidesNotConnected--;
            }
        }
        sidesNotConnectedCounter += sidesNotConnected;
    }
    console.log('method 2:', sidesNotConnectedCounter);
}

function findEmptyPocket (currentX, currentY, currentZ) {
    let arbitraryMax = 25;
    let arbitraryMin = -2;
    if ((Math.max(currentX, currentY, currentZ) > arbitraryMax) || (Math.min(currentX, currentY, currentZ) < arbitraryMin)) {
        return false;
    }
    let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
    for (const [x,y,z] of directionArray) {
        const newCoordinate = [currentX + x, currentY + y, currentZ + z];
        if (!points.has(newCoordinate.join())) {
            const pocket = expandPocket(newCoordinate, new Set());
            if (pocket) {
                emptyPocketArr.push(expandPocket(newCoordinate, new Set()));
            }
        }
    }
}

function expandPocket (coordinate, visited) { // DFS to fill up entire pocket
    visited.add(coordinate.join());
    let directionArray = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
    for (const [x, y, z] of directionArray) {
        const [oldX, oldY, oldZ] = coordinate.map(number => parseInt(number));
        const newCoordinate = [parseInt(oldX + x), parseInt(oldY + y), parseInt(oldZ + z)];
        if (visited.has(newCoordinate.join())) {
            continue;
        }
        if (points.has(newCoordinate.join())) {
            continue;
        }
        if (Math.max(...newCoordinate) > 30 || Math.min(...newCoordinate) < -2) {
            return undefined; // not a real pocket
        }
        return expandPocket(newCoordinate, visited);
    }
    return visited;
}


//     let foundLava = [0, 0, 0, 0, 0, 0]; // 1 means found another lava with an decrease in x, increase in x, decrease in y, increase in y, decrease in z, increase in z
//     for (let j = 0; j < arr.length; j++) {
//         // check all 6 sides of this cube, if there is no lava, add the coordinates to a set. 
//         let [nextX, nextY, nextZ] = arr[j].split(',').map(number => parseInt(number));
//         // console.log(currentX, currentY, currentZ, nextX, nextY, nextZ);
//         if (Math.abs(currentX - nextX) === 1 && currentY === nextY && currentZ === nextZ) {
//             if (currentX - nextX === 1) {
//                 // console.log('i got here');
//                 foundLava[0] = 1;
//             } else {
//                 foundLava[1] = 1;
//             }
//         } else if (currentX === nextX && Math.abs(currentY - nextY) === 1 && currentZ === nextZ) {
//             if (currentY - nextY === 1) {
//                 foundLava[2] = 1;
//             } else {
//                 foundLava[3] = 1;
//             }
//         } else if (currentX === nextX && currentY === nextY && Math.abs(currentZ - nextZ) === 1) {
//             if (currentZ - nextZ === 1) {
//                 foundLava[4] = 1;
//             } else {
//                 foundLava[5] = 1;
//             }
//         }
//     }
//     // console.log('foundLava', foundLava);
//     for (let j = 0; j < foundLava.length; j++) {
//         if (foundLava[j] === 0) {
//             return addEmptyPocket(currentX, currentY, currentZ, j);
//         }
//     }
//     for (let j = 0; j < arr.length; j++) { // useless code?
//         let [arrX, arrY, arrZ] = arr[i].split(',').map(number => parseInt(number));
//         if (currentX === arrX && currentY === arrY && currentZ === arrZ) {
//             return false;
//         }
//     }
//     if (checkFinishedPath(foundLava, tempEmptyPocketSet, currentX, currentY, currentZ)) { // all 1's or sides that are 0 are already part of tempEmptyPocketSet
//         return true;
//     }
// }

// function checkFinishedPath(foundLava, tempEmptyPocketSet, x, y, z) {
//     console.log('i got here', x, y, z);
//     for (let i = 0; i < foundLava.length; i++) {
//         if (foundLava[i] === 0) {
//             if (i === 0) {
//                 if (tempEmptyPocketSet.has((x - 1) + ',' + y + ',' + z)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } else if (i === 1) {
//                 if (tempEmptyPocketSet.has((x + 1) + ',' + y + ',' + z)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } else if (i === 2) {
//                 if (tempEmptyPocketSet.has(x + ',' + (y - 1) + ',' + z)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } else if (i === 3) {
//                 if (tempEmptyPocketSet.has(x + ',' + (y + 1) + ',' + z)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } else if (i === 4) {
//                 if (tempEmptyPocketSet.has(x + ',' + y + ',' + z - 1)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } else {
//                 if (tempEmptyPocketSet.has(x + ',' + y + ',' + z + 1)) {
//                     continue;
//                 } else {
//                     return false;
//                 }
//             } 
//         }
//     }
//     return true;
// }

// function addEmptyPocket(x, y, z, index) { // if hit arbitraryUpperBoundary or arbitraryLowerBoundary, don't union the set with the main set
//     // ex. if greater than arbitraryUpperBoundary, return 0;

//     // how do i know if i've finished my empty pocket path?
//     let arbitraryUpperBoundary = 30;
//     let arbitraryLowerBoundary = -3;
//     if (index === 0) {
//         if (!tempEmptyPocketSet.has((x - 1) + ',' + y + ',' + z) && Math.max(x - 1, y, z) < arbitraryUpperBoundary && Math.min(x - 1, y, z) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add((x - 1) + ',' + y + ',' + z);
//             return findEmptyPocket(x - 1, y, z);
//         }
//     } else if (index === 1) {
//         if (!tempEmptyPocketSet.has((x + 1) + ',' + y + ',' + z) && Math.max(x + 1, y, z) < arbitraryUpperBoundary && Math.min(x + 1, y, z) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add((x + 1) + ',' + y + ',' + z);
//             return findEmptyPocket(x + 1, y, z);
//         }
//     } else if (index === 2) {
//         if (!tempEmptyPocketSet.has(x + ',' + (y - 1) + ',' + z) && Math.max(x, y - 1, z) < arbitraryUpperBoundary && Math.min(x, y - 1, z) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add(x + ',' + (y - 1) + ',' + z);
//             return findEmptyPocket(x, y - 1, z);
//         }
//     } else if (index === 3) {
//         if (!tempEmptyPocketSet.has(x + ',' + (y + 1) + ',' + z) && Math.max(x, y + 1, z) < arbitraryUpperBoundary && Math.min(x, y + 1, z) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add(x + ',' + (y + 1) + ',' + z);
//             return findEmptyPocket(x, y + 1, z);
//         }
//     } else if (index === 4) {
//         if (!tempEmptyPocketSet.has(x + ',' + y + ',' + (z - 1)) && Math.max(x, y, z - 1) < arbitraryUpperBoundary && Math.min(x, y, z - 1) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add(x + ',' + y + ',' + (z - 1));
//             return findEmptyPocket(x, y, z - 1);
//         }
//     } else {
//         if (!tempEmptyPocketSet.has(x + ',' + y + ',' + (z + 1)) && Math.max(x, y, z + 1) < arbitraryUpperBoundary && Math.min(x, y, z + 1) > arbitraryLowerBoundary) {
//             tempEmptyPocketSet.add(x + ',' + y + ',' + (z + 1));
//             return findEmptyPocket(x, y, z + 1);
//         }
//     }
//     return false;  // went out of bounds
// }
