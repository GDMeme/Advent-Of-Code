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
    
    let [prizeX, prizeY] = thirdLine.split("X=")[1].split(", Y=").map(e => parseInt(e));
    
    prizeX += 10 ** 13;
    prizeY += 10 ** 13;
    
    // Cramer's rule for linear Diophantine equations
    const denominator = buttonAxIncrement * buttonByIncrement - buttonAyIncrement * buttonBxIncrement;
    
    if (denominator === 0) {
        continue;
    }
    
    const m = Math.floor((prizeX * buttonByIncrement - prizeY * buttonBxIncrement) / denominator);
    
    if (m * denominator !== prizeX * buttonByIncrement - prizeY * buttonBxIncrement) {
        continue;
    }
    
    const n = Math.floor((prizeY - buttonAyIncrement * m) / buttonByIncrement);
    if (n * buttonByIncrement !== prizeY - buttonAyIncrement * m) {
        continue;
    }
    result += 3 * m + n;    
}

console.log(result);

