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
                    let byrValue = parseInt(newInput[i + 1].split(' ')[0]);
                    if (byrValue >= 1920 && byrValue <= 2002) {
                        checkArray[0] = true;
                    }
                    break;
                case 'iyr':
                    const iyrValue = parseInt(newInput[i + 1].split(' ')[0]);
                    if (iyrValue >= 2010 && iyrValue <= 2020) {
                        checkArray[1] = true;
                    }
                    break;
                case 'eyr':
                    const eyrValue = parseInt(newInput[i + 1].split(' ')[0]);
                    if (eyrValue >= 2020 && eyrValue <= 2030) {
                        checkArray[2] = true;
                    }
                    break;
                case 'hgt':
                    const hgtValue = newInput[i + 1].split(' ')[0];
                    const unit = hgtValue.slice(-2);
                    const hgtNumber = parseInt(hgtValue.slice(0, -2));
                    if (unit === 'cm') {
                        if (hgtNumber >= 150 && hgtNumber <= 193) {
                            checkArray[3] = true;
                        }
                    } else if (unit === 'in') {
                        if (hgtNumber >= 59 && hgtNumber <= 76) {
                            checkArray[3] = true;
                        }
                    }
                    break;
                case 'hcl':
                    const hclValue = newInput[i + 1].split(' ')[0];
                    if (hclValue[0] === '#') {
                        let hclValid = true;
                        for (let j = 1; j < 7; j++) {
                            if (!isNaN(hclValue[j])) {
                                continue;
                            } else {
                                if (hclValue[j] === 'a' || hclValue[j] === 'b' || hclValue[j] === 'c' || hclValue[j] === 'd' || hclValue[j] === 'e' || hclValue[j] === 'f') {
                                    continue
                                } else {
                                    hclValid = false;
                                    break;
                                }
                            }
                        }
                        if (hclValid) {
                            checkArray[4] = true;
                        }
                    }
                    break;
                case 'ecl':
                    const eclValue = newInput[i + 1].split(' ')[0];
                    switch (eclValue) {
                        case 'amb':
                            checkArray[5] = true;
                            break;
                        case 'blu':
                            checkArray[5] = true;
                            break;
                        case 'brn':
                            checkArray[5] = true;
                            break;
                        case 'gry':
                            checkArray[5] = true;
                            break;
                        case 'grn':
                            checkArray[5] = true;
                            break;
                        case 'hzl':
                            checkArray[5] = true;
                            break;
                        case 'oth':
                            checkArray[5] = true;
                            break;
                    }
                    break;
                case 'pid':
                    const pidValue = newInput[i + 1].split(' ')[0];
                    if (pidValue.length !== 9) {
                        break;
                    }
                    let pidValid = true;
                    for (let j = 0; j < 9; j++) {
                        if (!isNaN(pidValue[j])) {
                            continue;
                        } else {
                            pidValid = false;
                            break;
                        }
                    }
                    if (pidValid) {
                        checkArray[6] = true;
                    }
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