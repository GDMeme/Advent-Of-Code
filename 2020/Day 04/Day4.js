const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

let validPassportCounter = 0;

for (let i = 0; i < arr.length; i++) {
    const checkArray = [];
    while (arr[i]) {
        let newInput = arr[i].split(':');
        for (let i = 0; i < newInput.length - 1; i++) {
            const possibleField = newInput[i].slice(-3);
            switch (possibleField) {
                case 'byr':
                    checkArray[0] = true;
                    break;
                case 'iyr':
                    checkArray[1] = true;
                    break;
                case 'eyr':
                    checkArray[2] = true;
                    break;
                case 'hgt':
                    checkArray[3] = true;
                    break;
                case 'hcl':
                    checkArray[4] = true;
                    break;
                case 'ecl':
                    checkArray[5] = true;
                    break;
                case 'pid':
                    checkArray[6] = true;
                    break;
            }
        }
        i++;
    }
    let validPassport = true;
    for (let i = 0; i <= 6; i++) {
        if (checkArray[i]) {
            continue;
        } else {
            validPassport = false;
            break;
        }
    }
    if (validPassport) {
        validPassportCounter++;
    }
}

console.log(validPassportCounter);