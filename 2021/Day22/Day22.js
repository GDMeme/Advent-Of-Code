const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

const onLights = new Set();

for (let i = 0; i < arr.length; i++) {
    const [x, y, z] = arr[i].split(',');
    let [minX, maxX] = x.split('..');
    if (minX[1] === 'n') {
        minX = parseInt(minX.slice(5));
    } else {
        minX = parseInt(minX.slice(6));
    }
    maxX = parseInt(maxX);
    let [minY, maxY] = y.split('..');
    minY = parseInt(minY.slice(2));
    maxY = parseInt(maxY);
    let [minZ, maxZ] = z.split('..');
    minZ = parseInt(minZ.slice(2));
    maxZ = parseInt(maxZ);

    if (maxX < -50) {
        continue;
    }
    if (minX > 50) {
        continue;
    }
    if (maxY < -50) {
        continue;
    }
    if (minY > 50) {
        continue;
    }
    if (maxZ < -50) {
        continue;
    }
    if (minZ > 50) {
        continue;
    }

    if (minX < -50) {
        minX = -50;
    }
    if (maxX > 50) {
        maxX = 50;
    }
    if (minY < -50) {
        minY = -50;
    }
    if (maxY > 50) {
        maxY = 50;
    }
    if (minZ < -50) {
        minZ = -50;
    }
    if (maxZ > 50) {
        maxZ = 50;
    }

    if (arr[i].slice(0, 2) === 'on') {
        for (let j = minX; j <= maxX; j++) {
            for (let k = minY; k <= maxY; k++) {
                for (let l = minZ; l <= maxZ; l++) {
                    onLights.add([j, k, l].join());
                }
            }
        }
    } else {
        for (let j = minX; j <= maxX; j++) {
            for (let k = minY; k <= maxY; k++) {
                for (let l = minZ; l <= maxZ; l++) {
                    const checkString = [j, k, l].join();
                    if (onLights.has(checkString)) {
                        onLights.delete(checkString);
                    }
                }
            }
        }
    }
}

console.log(onLights.size);