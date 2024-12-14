const {readFileSync, writeFileSync, promises: fsPromises} = require('fs');

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

const width = 101;
const height = 103;

const robotPositions = new Set();
for (let i = 0; i < height * width; i++) {
    let skipImage = false;
    robotPositions.clear();
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
        
        //* Guess that if robots are overlapping, won't form a Christmas tree
        // Second idea would've been to check for 3x3 grid of all robots
        if (robotPositions.has(`${robot["posX"]},${robot["posY"]}`)) {
            skipImage = true;
        }
        robotPositions.add(`${robot["posX"]},${robot["posY"]}`);
    }
    
    // Show what the image looks like
    // Manually go through images
    if (!skipImage && i !== 0) {
        let image = "";
            for (let j = 0; j < height; j++) {
                for (let k = 0; k < width; k++) {
                    if (robotPositions.has(`${k},${j}`)) {
                        image += "1";
                    } else {
                        image += ".";
                    }
                }
                image += "\n";
            }
        
        writeFileSync(`${i}.txt`, image);
        
        console.log(i + 1);
    }
}