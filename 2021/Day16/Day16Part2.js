const { readFileSync } = require('fs');

const binaryInput = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)[0].split('').map(e => hex2bin(e)).join('');

console.log(parsePacket(binaryInput)[1]);

function parsePacket(binaryInput) {
    const packetVersion = parseInt(binaryInput.slice(0, 3), 2);
    const packetTypeID = parseInt(binaryInput.slice(3, 6), 2);
    
    if (packetTypeID === 4) {
        let i = 6;
        let literalValueBits = '';
        while (binaryInput[i] === '1') {
            literalValueBits += binaryInput.slice(i + 1, i + 5);
            i += 5;
        }
        literalValueBits += binaryInput.slice(i + 1, i + 5);
        i += 5;
        return [binaryInput.slice(i), parseInt(literalValueBits, 2)];
    } else {
        return parseOperator(binaryInput.slice(6), packetTypeID);
    }
}

function parseOperator(binaryInput, packetTypeID) {
    const lengthTypeID = binaryInput[0];
    
    if (lengthTypeID === '0') {
        const totalBits = parseInt(binaryInput.slice(1, 16), 2);
        
        let subPackets = binaryInput.slice(16, 16 + totalBits);
        let rest = binaryInput.slice(16 + totalBits);
        const literals = [];
        while (subPackets.length > 0) {
            const [remainingSubPackets, literal] = parsePacket(subPackets);
            literals.push(literal);
            subPackets = remainingSubPackets;
        }
    
        switch (packetTypeID) {
            case 0:
                return [rest, literals.reduce((a, b) => a + b)];
            case 1:
                return [rest, literals.reduce((a, b) => a * b)];
            case 2:
                return [rest, Math.min(...literals)];
            case 3:
                return [rest, Math.max(...literals)];
            case 5:
                return [rest, literals[0] > literals[1] ? 1 : 0];
            case 6:
                return [rest, literals[0] < literals[1] ? 1 : 0];
            case 7:
                return [rest, literals[0] === literals[1] ? 1 : 0];
        }
    } else {
        const numberOfSubPackets = parseInt(binaryInput.slice(1, 12), 2);
        
        let rest = binaryInput.slice(12);
        const literals = [];
        for (let i = 0; i < numberOfSubPackets; i++) {
            const [newRest, literal] = parsePacket(rest);
            literals.push(literal);
            rest = newRest;
        }
        
        switch (packetTypeID) {
            case 0:
                return [rest, literals.reduce((a, b) => a + b)];
            case 1:
                return [rest, literals.reduce((a, b) => a * b)];
            case 2:
                return [rest, Math.min(...literals)];
            case 3:
                return [rest, Math.max(...literals)];
            case 5:
                return [rest, literals[0] > literals[1] ? 1 : 0];
            case 6:
                return [rest, literals[0] < literals[1] ? 1 : 0];
            case 7:
                return [rest, literals[0] === literals[1] ? 1 : 0];
        }
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