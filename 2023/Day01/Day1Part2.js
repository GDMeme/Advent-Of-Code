const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
    const contents = readFileSync(filename, 'utf-8');

    const arr = contents.split(/\r?\n/);

    return arr;
}

let arr = syncReadFile('./input.txt');

function isThreeDigit(input) {
    switch (input) {
        case "one":
            return 1;
        case "two":
            return 2;
        case "six":
            return 6;
    }
    return 0;
}

function isFourDigit(input) {
    switch (input) {
        case "four":
            return 4;
        case "five":
            return 5;
        case "nine":
            return 9;
    }
    return 0;
}

function isFiveDigit(input) {
    switch (input) {
        case "three":
            return 3;
        case "seven":
            return 7;
        case "eight":
            return 8;
    }
    return 0;
}


let temp;
let temp2;
let firstFound;
let secondFound;
let result = 0;
for (let i = 0; i < arr.length; i++) {
    temp = 0;
    firstFound = false;
    secondFound = false;
    for (let j = 0; j < arr[i].length; j++) {
        if (!isNaN(arr[i][j])) {
            temp = Number(arr[i][j]);
            firstFound = true;
        } else if (j + 3 < arr[i].length) {
            temp = isThreeDigit(arr[i].slice(j, j + 3));
            if (temp === 0) {
                if (j + 4 < arr[i].length) {
                    temp = isFourDigit(arr[i].slice(j, j + 4));
                    if (temp === 0) {
                        if (j + 5 < arr[i].length) {
                            temp = isFiveDigit(arr[i].slice(j, j + 5));
                            if (temp != 0) {
                                firstFound = true;
                            }
                        }
                    } else {
                        firstFound = true;
                    }
                }
            } else {
                firstFound = true;
            }
        }
        if (firstFound) {
            for (let k = arr[i].length; k >= 0; k--) {
                if (!isNaN(arr[i][k])) {
                    temp = temp * 10 + Number(arr[i][k]);
                    secondFound = true;
                    break;
                } else if (k - 3 >= 0) {
                    temp2 = isThreeDigit(arr[i].slice(k - 3, k));
                    if (temp2 === 0) {
                        if (k - 4 >= 0) {
                            temp2 = isFourDigit(arr[i].slice(k - 4, k));
                            if (temp2 === 0) {
                                if (k - 5 >= 0) {
                                    temp2 = isFiveDigit(arr[i].slice(k - 5, k));
                                    if (temp2 != 0) {
                                        secondFound = true;
                                        temp = temp * 10 + temp2;
                                        break;
                                    }
                                }
                            } else {
                                secondFound = true;
                                temp = temp * 10 + temp2;
                                break;
                            }
                        }
                    } else {
                        secondFound = true;
                        temp = temp * 10 + temp2;
                        break;
                    }
                }
            }
        }
        if (secondFound) {
            break;
        }
    }
    result += temp;
}

console.log(result);