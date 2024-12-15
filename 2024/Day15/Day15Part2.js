const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let currentIndex = 0;

let subX;
let subY;

// Find the sub and the end of grid
while (arr[currentIndex] !== "") {
    let newLine = "";
    for (let i = 0; i < arr[currentIndex].length; i++) {
        if (arr[currentIndex][i] === "#") {
            newLine += "##";
        } else if (arr[currentIndex][i] === "O") {
            newLine += "[]";
        } else if (arr[currentIndex][i] === ".") {
            newLine += ".."
        } else {
            subX = i * 2;
            subY = currentIndex ;
            // Replace the sub spot with a .
            newLine += "..";
        }
    }
    arr[currentIndex] = newLine;
    
    currentIndex++;
}

const width = arr[0].length;

currentIndex++;

let moves = "";
while (currentIndex < arr.length) {
    moves += arr[currentIndex];
    currentIndex++;
}

for (const move of moves) {
    if (move === "^") {
        const firstCheckY = subY - 1;
        let doMove = true;
        const coordinatesToCheck = [`${subX},${firstCheckY}`];
        const coordinatesToMove = [];
        
        while (coordinatesToCheck.length !== 0) {
            let [currentCheckX, currentCheckY] = coordinatesToCheck.pop().split(",").map(e => parseInt(e));
            if (arr[currentCheckY][currentCheckX] === "#") {
                doMove = false;
                break;
            }
            if (arr[currentCheckY][currentCheckX] === ".") {
                doMove = true;
                continue;
            }
            
            // Otherwise hit a box, recursively check upwards on both sides
            coordinatesToCheck.push(`${currentCheckX},${currentCheckY - 1}`);
            const newCoordinate = arr[currentCheckY][currentCheckX] === "]" ? `${currentCheckX - 1},${currentCheckY - 1}` : `${currentCheckX + 1},${currentCheckY - 1}`
            coordinatesToCheck.push(newCoordinate);
            if (arr[currentCheckY][currentCheckX] === "[") {
                coordinatesToMove.push(`${currentCheckX},${currentCheckY}`);
                coordinatesToMove.push(`${currentCheckX + 1},${currentCheckY}`);
            } else {
                coordinatesToMove.push(`${currentCheckX},${currentCheckY}`);
                coordinatesToMove.push(`${currentCheckX - 1},${currentCheckY}`);
            }
                
            currentCheckY -= 1;
        }
        
        // Sort by y value descending or else lines will overwrite each other
        coordinatesToMove.sort((a, b) => {
            const [_, y1] = a.split(",");
            const [__, y2] = b.split(",");
            return y2 - y1;
        });
                   
        if (doMove) {       
            // Slow, can optimize by grouping each line and doing whole line at once
            let previousY;
            const currentLineXs = new Set();
            while (coordinatesToMove.length !== 0) {
                // Need to start from the smallest y coordinate
                const [x, y] = coordinatesToMove.pop().split(",").map(e => parseInt(e));
                
                if (y !== previousY && previousY !== undefined) {
                    const max = Math.max(...currentLineXs);
                    const min = Math.min(...currentLineXs);
                    arr[previousY] = arr[previousY].slice(0, min) + ".".repeat(max - min + 1) + arr[previousY].slice(max + 1, width);
                    currentLineXs.clear();
                }
                
                currentLineXs.add(`${x}`);
                
                arr[y - 1] = arr[y - 1].slice(0, x) + arr[y][x] + arr[y - 1].slice(x + 1, width);
                previousY = y;
            }
            
            // Update sub's new spot and spot beside sub's new spot
            if (arr[subY - 1][subX] === "]") {
                arr[subY - 1] = arr[subY - 1].slice(0, subX - 1) + ".." + arr[subY - 1].slice(subX + 1, width);
            } else if (arr[subY - 1][subX] === "[") {
                arr[subY - 1] = arr[subY - 1].slice(0, subX) + ".." + arr[subY - 1].slice(subX + 2, width);
            }
            
            subY--;
        }
    } else if (move === ">") {
        let checkX = subX + 1;
        let doMove = true;
        while (true) {
            if (arr[subY][checkX] === "#") {
                doMove = false;
                break;
            }
            if (arr[subY][checkX] === ".") {
                doMove = true;
                break;
            }
            
            // Otherwise hit a box, check index + 2
            // Will never go index out of bounds cuz wall is 2 thick
            checkX += 2;
        }
        
        if (doMove) {
            // Check if need to move a box
            const numBoxes = Math.ceil((checkX - subX) / 2 - 1);
            arr[subY] = arr[subY].slice(0, subX + 1) + "." + "[]".repeat(numBoxes) + arr[subY].slice(subX + (numBoxes * 2) + 2, width);
            subX++;
        }
    } else if (move === "v") {
        const firstCheckY = subY + 1;
        let doMove = true;
        const coordinatesToCheck = [`${subX},${firstCheckY}`];
        const coordinatesToMove = [];
        
        while (coordinatesToCheck.length !== 0) {
            let [currentCheckX, currentCheckY] = coordinatesToCheck.pop().split(",").map(e => parseInt(e));
            if (arr[currentCheckY][currentCheckX] === "#") {
                doMove = false;
                break;
            }
            if (arr[currentCheckY][currentCheckX] === ".") {
                doMove = true;
                continue;
            }
            
            // Otherwise hit a box, recursively check upwards on both sides
            coordinatesToCheck.push(`${currentCheckX},${currentCheckY + 1}`);
            const newCoordinate = arr[currentCheckY][currentCheckX] === "]" ? `${currentCheckX - 1},${currentCheckY + 1}` : `${currentCheckX + 1},${currentCheckY + 1}`
            coordinatesToCheck.push(newCoordinate);
            if (arr[currentCheckY][currentCheckX] === "[") {
                coordinatesToMove.push(`${currentCheckX},${currentCheckY}`);
                coordinatesToMove.push(`${currentCheckX + 1},${currentCheckY}`);
            } else {
                coordinatesToMove.push(`${currentCheckX},${currentCheckY}`);
                coordinatesToMove.push(`${currentCheckX - 1},${currentCheckY}`);
            }
                
            currentCheckY += 1;
        }
        // Sort by y value ascending or else lines will overwrite each other
        coordinatesToMove.sort((a, b) => {
            const [_, y1] = a.split(",");
            const [__, y2] = b.split(",");
            return y1 - y2;
        });
                   
        if (doMove) {       
            // Slow, can optimize by grouping each line and doing whole line at once
            let previousY;
            const currentLineXs = new Set();
            while (coordinatesToMove.length !== 0) {
                // Need to start from the biggest y coordinate
                const [x, y] = coordinatesToMove.pop().split(",").map(e => parseInt(e));
                
                if (y !== previousY && previousY !== undefined) {
                    const max = Math.max(...currentLineXs);
                    const min = Math.min(...currentLineXs);
                    arr[previousY] = arr[previousY].slice(0, min) + ".".repeat(max - min + 1) + arr[previousY].slice(max + 1, width);
                    currentLineXs.clear();
                }
                
                currentLineXs.add(`${x}`);
                
                arr[y + 1] = arr[y + 1].slice(0, x) + arr[y][x] + arr[y + 1].slice(x + 1, width);
                previousY = y;
            }
            
            // Update sub's new spot and spot beside sub's new spot
            if (arr[subY + 1][subX] === "]") {
                arr[subY + 1] = arr[subY + 1].slice(0, subX - 1) + ".." + arr[subY + 1].slice(subX + 1, width);
            } else if (arr[subY + 1][subX] === "[") {
                arr[subY + 1] = arr[subY + 1].slice(0, subX) + ".." + arr[subY + 1].slice(subX + 2, width);
            }
            
            subY++;
        }
    } else if (move === "<") {
        let checkX = subX - 1;
        let doMove = true;
        while (true) {
            if (arr[subY][checkX] === "#") {
                doMove = false;
                break;
            }
            if (arr[subY][checkX] === ".") {
                doMove = true;
                break;
            }
            
            // Otherwise hit a box, check index + 2
            // Will never go index out of bounds cuz wall is 2 thick
            checkX -= 2;
        }
        
        if (doMove) {
            // Check if need to move a box
            const numBoxes = Math.ceil((subX - checkX) / 2 - 1);
            arr[subY] = arr[subY].slice(0, subX - numBoxes * 2 - 1) + "[]".repeat(numBoxes) + "." + arr[subY].slice(subX, width);
            subX--;
        }
    }
}

let result = 0;
for (let i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
        break;
    }
    
    for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === "[") {
            result += 100 * i + j;
        }
    }
}

console.log(result);