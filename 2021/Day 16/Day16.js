// recursion bruh

const {readFileSync, promises: fsPromises} = require('fs');

function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');

  const arr = contents.split(/\r?\n/);

  return arr;
}

let arr = syncReadFile('./input.txt');

arr = arr.map(e => hex2bin(e)).toString();

console.log(arr);

let packetVersionSum = 0;

isLiteralOrOperator(0, undefined, 0);

function isLiteralOrOperator(index, totalLength, currentLength, lengthTypeOne, numberOfSubPackets) {

    if (currentLength === totalLength) {
        return true;
    }

    if (lengthTypeOne) {
        for (let i = 0; i < numberOfSubPackets; i++) {
            isLiteralOrOperator(); // i am so lost
        }
    }

    const packetVersion = parseInt(arr.slice(index, index + 3), 2);
    packetVersionSum += packetVersion;

    const packetTypeID = parseInt(arr.slice(index + 3, index + 6), 2);
    index += 6; // start at the next index

    currentLength += 6;
    
    if (packetTypeID === 4) {
        return literalValue(index, currentLength);
    } else {
        return operator(index, currentLength);
    }
}

function literalValue(index) {

}

function operator(index) {
    const lengthTypeID = parseInt(arr.slice(index, index + 1), 2);
    index += 1; // start at the next index

    if (lengthTypeID === 0) {
        const totalLength = parseInt(arr.slice(index, index + 16), 2);
        index += 16; // start at the next index
        currentLength += 17;
        return isLiteralOrOperator(index, totalLength, currentLength, false);
    } else {
        const numberOfSubPackets = parseInt(arr.slice(index, index + 12));
        currentLength += 13;
        return isLiteralOrOperator(index, totalLength, currentLength, true, numberOfSubPackets)
    }
}

function hex2bin(hex){
    hex = hex.replace("0x", "").toLowerCase();
    var out = "";
    for(var c of hex) {
        switch(c) {
            case '0': out += "0000"; break;
            case '1': out += "0001"; break;
            case '2': out += "0010"; break;
            case '3': out += "0011"; break;
            case '4': out += "0100"; break;
            case '5': out += "0101"; break;
            case '6': out += "0110"; break;
            case '7': out += "0111"; break;
            case '8': out += "1000"; break;
            case '9': out += "1001"; break;
            case 'a': out += "1010"; break;
            case 'b': out += "1011"; break;
            case 'c': out += "1100"; break;
            case 'd': out += "1101"; break;
            case 'e': out += "1110"; break;
            case 'f': out += "1111"; break;
            default: return "";
        }
    }

    return out;
}