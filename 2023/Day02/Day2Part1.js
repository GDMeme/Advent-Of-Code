const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

let ID;
let games;
let individual;
let red;
let green;
let blue;
let quantity;
let colour;
let result = 0;
let possible = true;

for (let i = 0; i < arr.length; i++) {
    [ID, games] = arr[i].split(": ");
    ID = Number(ID.split(" ")[1]);
    games = games.split("; ");
    possible = true;
    for (let j = 0; j < games.length; j++) {
        individual = games[j].split(', ');
        red = 0;
        green = 0;
        blue = 0;
        for (let k = 0; k < individual.length; k++) {
            [quantity, colour] = individual[k].split(" ");
            quantity = Number(quantity);
            switch (colour) {
                case "red":
                    red += quantity;
                    break;
                case "green":
                    green += quantity;
                    break;
                case "blue":
                    blue += quantity;
                    break;
            }
        }
        if (red > 12 || green > 13 || blue > 14) {
            possible = false;
            break;
        }
    }
    if (possible) {
        result += ID;
    }
}

console.log(result);