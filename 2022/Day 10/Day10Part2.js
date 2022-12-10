const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

function draw (repeat) {
    index = Math.floor(currentCycle/40);
    horizontalPosition = currentCycle % 40;
    if (spritePosition.includes(horizontalPosition)) {
        image[index] += '#';
    } else {
        image[index] += '.';
    }
    currentCycle++;
    if (repeat) {
        draw(false);
    }
}

let arr = syncReadFile('./input.txt');
let currentCycle = 0;
let registerValue = 1;
let image = [[], [], [], [], [], []];
let spritePosition = [0, 1, 2];
for (let i = 0; i < arr.length; i++) { // draw the pixel in CRT (compare to current sprite), move register (if applicable), move sprite
    if (arr[i].split(' ')[0] === 'addx') {
        draw(true);
        registerValue += parseInt(arr[i].split(' ')[1]);
        spritePosition = [registerValue - 1, registerValue, registerValue + 1];
    } else { // noop
        draw(false);
    }
}
console.log(image);