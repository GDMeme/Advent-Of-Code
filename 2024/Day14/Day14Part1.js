const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

const robots = [];

for (const line of arr) {
    const [position, velocity] = line.split(" ");
    
    const [posX, posY] = position.split("p=")[1].split(",").map(e => parseInt(e));
    const [velX, velY] = velocity.split("v=")[1].split(",").map(e => parseInt(e));
    
    robots.push({posX, posY, velX, velY});
}

const numSeconds = 100;
const width = 101;
const height = 103;

for (let i = 0; i < numSeconds; i++) {
    for (const robot of robots) { 
        robot["posX"] += robot["velX"];
        robot["posY"] += robot["velY"];
        
        if (robot["posX"] >= width) {
            robot["posX"] -= width;
        } else if (robot["posX"] < 0) {
            robot["posX"] += width;
        }
        
        if (robot["posY"] >= height) {
            robot["posY"] -= height;
        } else if (robot["posY"] < 0) {
            robot["posY"] += height;
        }
    }
}

const xIgnore = Math.floor(width / 2);
const yIgnore = Math.floor(height / 2);

const numQuadrants = [0, 0, 0, 0]; // top right, top left, bottom left, bottom right

for (const robot of robots) {
    if (robot["posX"] === xIgnore || robot["posY"] === yIgnore) {
        continue;
    }
    
    if (robot["posX"] < xIgnore) {
        if (robot["posY"] < yIgnore) {
            numQuadrants[1]++;
        } else {
            numQuadrants[2]++;
        }
    } else {
        if (robot["posY"] < yIgnore) {
            numQuadrants[0]++;
        } else {
            numQuadrants[3]++;
        }
    }
}

console.log(numQuadrants.reduce((a, b) => a * b));