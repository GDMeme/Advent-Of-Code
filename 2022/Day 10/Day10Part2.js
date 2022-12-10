const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

function draw (repeat) {
    let index = Math.floor(currentCycle/40);
    let horizontalPosition = currentCycle % 40;
    if (Math.abs(registerValue - horizontalPosition) <= 1) {
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
for (let i = 0; i < arr.length; i++) { // draw the pixel in CRT (compare to current sprite), move register (if applicable), move sprite
    const [cmd, val] = arr[i].split(' ');
    if (cmd === 'addx') {
        draw(true);
        registerValue += parseInt(val);
    } else { // noop
        draw(false);
    }
}
console.log(image);