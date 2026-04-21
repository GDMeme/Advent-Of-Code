const { readFileSync } = require("fs");

const arr = readFileSync("./input.txt", "utf-8").split(/\r?\n/);

const [cardPublicKey, doorPublicKey] = arr.map(Number);

let cardLoopSize;
let doorLoopSize;
let loopSize = 1;
let val = 1;
while (!cardLoopSize || !doorLoopSize) {
    val = (val * 7) % 20201227;
    
    if (val === cardPublicKey) {
        cardLoopSize = loopSize;
    } else if (val === doorPublicKey) {
        doorLoopSize = loopSize;
    }
    
    loopSize++;
}

let result = 1;
for (let i = 0; i < cardLoopSize; i++) {
    result = (result * doorPublicKey) % 20201227;
}

console.log(result);

// Verify with the other public key
let result2 = 1;
for (let i = 0; i < doorLoopSize; i++) {
    result2 = (result2 * cardPublicKey) % 20201227;
}

console.log(result2);