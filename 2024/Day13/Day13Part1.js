const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let result = 0;

for (let i = 0; i < arr.length; i += 4) {
    const firstLine = arr[i];
    const secondLine = arr[i + 1];
    const thirdLine = arr[i + 2];
    
    const [buttonAxIncrement, buttonAyIncrement] = firstLine.split("X+")[1].split(", Y+").map(e => parseInt(e));
    const [buttonBxIncrement, buttonByIncrement] = secondLine.split("X+")[1].split(", Y+").map(e => parseInt(e));
    
    const [prizeX, prizeY] = thirdLine.split("X=")[1].split(", Y=").map(e => parseInt(e));
    
    let currentMinA = 101; // Can't be 101 button presses
    let currentMinB = 101;
    
    // Try 0 to 100 A presses and spam B presses until overflow
    for (let j = 0; j < 101; j++) {
        let currentX = 0;
        let currentY = 0;
        
        
        let APresses = j;
        let BPresses = 0;
        
        currentX = j * buttonAxIncrement;
        currentY = j * buttonAyIncrement;
        
        while (currentX < prizeX && currentY < prizeY && BPresses <= 100) {
            currentX += buttonBxIncrement;
            currentY += buttonByIncrement;
            BPresses += 1;
        }
        
        if (currentX === prizeX && currentY === prizeY && BPresses <= 100) {
            if (APresses + BPresses < currentMinA + currentMinB) {
                currentMinA = APresses;
                currentMinB = BPresses;
            }
        }
    }
    
    result += currentMinA + currentMinB === 202 ? 0 : 3 * currentMinA + currentMinB;
}

console.log(result);

