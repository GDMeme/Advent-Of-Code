const { readFileSync } = require('fs');

const binaryInput = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)[0].split('').map(e => hex2bin(e)).join('');

let ans = 0;

parsePacket(binaryInput);

console.log(ans);

function parsePacket(binaryInput) {
    const packetVersion = parseInt(binaryInput.slice(0, 3), 2);
    const packetTypeID = parseInt(binaryInput.slice(3, 6), 2);
    
    ans += packetVersion;
    if (packetTypeID === 4) {
        let i = 6;
        while (binaryInput[i] === '1') {
            i += 5;
        }
        i += 5; // skip the last group of bits
        return binaryInput.slice(i);
    } else {
        return parseOperator(binaryInput.slice(6));
    }
}

function parseOperator(binaryInput) {
    const lengthTypeID = binaryInput[0];
    
    if (lengthTypeID === '0') {
        const totalBits = parseInt(binaryInput.slice(1, 16), 2);
        
        let subPackets = binaryInput.slice(16, 16 + totalBits);
        let rest = binaryInput.slice(16 + totalBits);
    
        while (subPackets.length > 0) {
            subPackets = parsePacket(subPackets);
        }
    
        return rest;
    } else {
        const numberOfSubPackets = parseInt(binaryInput.slice(1, 12), 2);
        
        let rest = binaryInput.slice(12);
    
        for (let i = 0; i < numberOfSubPackets; i++) {
            rest = parsePacket(rest);
        }
    
        return rest;
    }
}

function hex2bin(hex){
    let out = "";
    for (const c of hex) {
        switch (c) {
            case '0':
                out += "0000";
                break;
            case '1':
                out += "0001";
                break;
            case '2':
                out += "0010";
                break;
            case '3':
                out += "0011";
                break;
            case '4':
                out += "0100";
                break;
            case '5':
                out += "0101";
                break;
            case '6':
                out += "0110";
                break;
            case '7':
                out += "0111";
                break;
            case '8':
                out += "1000";
                break;
            case '9':
                out += "1001";
                break;
            case 'A':
                out += "1010";
                break;
            case 'B':
                out += "1011";
                break;
            case 'C':
                out += "1100";
                break;
            case 'D':
                out += "1101";
                break;
            case 'E':
                out += "1110";
                break;
            case 'F':
                out += "1111";
                break;
            default:
                return "";
        }
    }

    return out;
}