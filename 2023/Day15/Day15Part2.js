const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)[0].split(',');

const boxes = Array.from({ length: 256 }, () => []);

function findBox(label) {
    let currValue = 0;
    for (let i = 0; i < label.length; i++) {
        const asciiValue = label.charCodeAt(i);
        currValue += asciiValue;
        currValue *= 17;
        currValue  %= 256;
    }
    return currValue;
}

for (const step of arr) {
    if (step.includes('-')) {
        const label = step.split('-')[0];
        const box = findBox(label);
        
        for (let i = 0; i < boxes[box].length; i++) {
            const [currLabel, _] = boxes[box][i].split(' ');
            if (currLabel === label) {
                boxes[box].splice(i, 1);
                break;
            }
        }
    } else { // '='
        const [label, focalLength] = step.split('=');
        const box = findBox(label);
        let found = false;
        
        for (let i = 0; i < boxes[box].length; i++) {
            const [currLabel, _] = boxes[box][i].split(' ');
            if (currLabel === label) {
                boxes[box][i] = `${currLabel} ${focalLength}`;
                found = true;
                break;
            }
        }
        
        if (!found) {
            boxes[box].push(`${label} ${focalLength}`);
        }
    }
}

console.log(boxes.reduce((acc, box, i) => {
    for (let j = 0; j < box.length; j++) {
        const [_, focalLength] = box[j].split(' ');
        acc += (i + 1) * (j + 1) * focalLength;
    }
    return acc;
}, 0));