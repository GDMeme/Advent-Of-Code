const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let directorySize = []; // size of it's directory, ignore nested directory sizes [94269, 584, 24933642]
let directoryPath = []; // the path to find the known directories [a, a.e, d]
let currentDirectoryPath = ''; // in order to get the directoryPath (will be equal to a, then a.e, then d)
// at the end, look in directoryPath to find all indexes that start with it's own string, add those values to itself


// - / (dir)
//   - a (dir)
//     - e (dir)
//       - i (file, size=584)
//     - f (file, size=29116)
//     - g (file, size=2557)
//     - h.lst (file, size=62596)
//   - b.txt (file, size=14848514)
//   - c.dat (file, size=8504156)
//   - d (dir)
//     - j (file, size=4060174)
//     - d.log (file, size=8033020)
//     - d.ext (file, size=5626152)
//     - k (file, size=7214296)

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '$ cd /') { // only on the first line, size of / is definitely bigger than 100k, don't need to calculate size of this
        i = i + 2; // ls right after, ignore all the files and directories
        while (arr[i][0] !== '$') {
            i++;
        }
        i--;
        continue;
    } else if (arr[i][0] === '$') { // ls or cd
        let onlyDirectories = true;
        if (arr[i][2] === 'c') { // cd
            if (arr[i][5] === '.') { // go back // a.e.
                currentDirectoryPath = currentDirectoryPath.slice(0, -1); // remove the trailing '.'
                let lastPeriod = currentDirectoryPath.lastIndexOf("."); // 1
                let removeCharacters = currentDirectoryPath.length - lastPeriod - 1;
                currentDirectoryPath = currentDirectoryPath.slice(0, -removeCharacters); // leaves the trailing '.'
            } else { // going into a directory
                currentDirectoryPath += arr[i].split(' ')[2] + '.';
            }
        } else { // ls
            i++;
            let currentIndex = directoryPath.indexOf(currentDirectoryPath.slice(0, -1)); // because of extra . at end
            if (currentIndex === -1) {  // make sure it's a new ls and not a duplicate
                currentIndex = directorySize.length;
                let onlyDirectoriesCounter = 0;
                while (arr[i] !== undefined && arr[i][0] !== '$') {
                    onlyDirectoriesCounter++;
                    if (arr[i].slice(0, 3) !== 'dir') { // found a file
                        onlyDirectories = false;
                        if (directorySize[currentIndex] === undefined) {
                            directorySize[currentIndex] = parseInt(arr[i].split(' ')[0]);
                            directoryPath[currentIndex] = currentDirectoryPath; // in case it only contains directories
                        } else {
                            directorySize[currentIndex] += parseInt(arr[i].split(' ')[0]);
                        }
                    }
                    i++;
                }
                if (onlyDirectories === true) {
                    onlyDirectories = false;
                    directorySize.push(0);
                    directoryPath.push(currentDirectoryPath);
                }
            i--;
            }
        }
    }
}
let outermostDirectorySize = 0
for (let i = 0; i < directorySize.length; i++) {
    outermostDirectorySize += directorySize[i];
}
i = 2;
while (arr[i][0] !== '$') {
    if (arr[i].slice(0, 3) !== 'dir') {
        outermostDirectorySize += parseInt(arr[i].split(' ')[0]);
    }
    i++;
}

for (let i = 0; i < directorySize.length; i++) {
    let currentDirectory = directoryPath[i]; 
    let currentDirectoryLength = directoryPath[i].length;
    for (let j = 0; j < directorySize.length; j++) {
        if (i === j) {
            continue;
        } else {
            let found = false;
            for (let k = 0; k < currentDirectoryLength; k++) {
                if (currentDirectory[k] === directoryPath[j][k]) {
                    if (k === currentDirectoryLength - 1) {
                        found = true;
                        break;
                    }
                } else {
                    break;
                }
            }
            if (found === true) {
                directorySize[i] += directorySize[j];
            }
        }
    }
}

let mustFreeUp = outermostDirectorySize - 40000000;
currentWinner = Number.MAX_SAFE_INTEGER;
for (let i = 0; i < directorySize.length; i++) {
    if (directorySize[i] >= mustFreeUp) {
        if (directorySize[i] <= currentWinner) {
            currentWinner = directorySize[i];
        }
    }
}
console.log('current winner:', currentWinner);