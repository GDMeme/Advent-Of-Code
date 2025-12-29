const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

const start = { x: 0, y: 0, direction: 'right' };
const frontier = [start];

const cache = new Set();
const visited = new Set();

function getNextPosition(x, y, direction) {
    switch (direction) {
        case 'right':
            return { newX: x + 1, newY: y };
        case 'down':
            return { newX: x, newY: y + 1 };
        case 'left':
            return { newX: x - 1, newY: y };
        case 'up':
            return { newX: x, newY: y - 1 };
    }
}

function outOfBounds(x, y) {
    return y < 0 || y >= arr.length || x < 0 || x >= arr[y].length;
}

while (frontier.length !== 0) {
    const { x, y, direction } = frontier.pop();
    cache.add(`${x},${y},${direction}`);
    visited.add(`${x},${y}`);
    const cell = arr[y][x];
    
    if (cell === '.') {
        const { newX, newY } = getNextPosition(x, y, direction);
        if (!outOfBounds(newX, newY) && !cache.has(`${newX},${newY},${direction}`)) {
            frontier.push({ x: newX, y: newY, direction });
        }
    } else if (cell === '/') {
        let newDirection;
        switch (direction) {
            case 'right':
                newDirection = 'up';
                break;
            case 'down':
                newDirection = 'left';
                break;
            case 'left':
                newDirection = 'down';
                break;
            case 'up':
                newDirection = 'right';
                break;
        }
        const { newX, newY } = getNextPosition(x, y, newDirection);
        if (!outOfBounds(newX, newY) && !cache.has(`${newX},${newY},${newDirection}`)) {
            frontier.push({ x: newX, y: newY, direction: newDirection });
        }
    } else if (cell === '\\') {
        let newDirection;
        switch (direction) {
            case 'right':
                newDirection = 'down';
                break;
            case 'down':
                newDirection = 'right';
                break;
            case 'left':
                newDirection = 'up';
                break;
            case 'up':
                newDirection = 'left';
                break;
        }
        const { newX, newY } = getNextPosition(x, y, newDirection);
        if (!outOfBounds(newX, newY) && !cache.has(`${newX},${newY},${newDirection}`)) {
            frontier.push({ x: newX, y: newY, direction: newDirection });
        }
    } else if (cell === '-') {
        if (direction === 'right' || direction === 'left') {
            const { newX, newY } = getNextPosition(x, y, direction);
            if (!outOfBounds(newX, newY) && !cache.has(`${newX},${newY},${direction}`)) {
                frontier.push({ x: newX, y: newY, direction });
            }
        } else {
            // Split into 2 beams
            const rightPos = getNextPosition(x, y, 'right');
            if (!outOfBounds(rightPos.newX, rightPos.newY) && !cache.has(`${rightPos.newX},${rightPos.newY},right`)) {
                frontier.push({ x: rightPos.newX, y: rightPos.newY, direction: 'right' });
            }
            const leftPos = getNextPosition(x, y, 'left');
            if (!outOfBounds(leftPos.newX, leftPos.newY) && !cache.has(`${leftPos.newX},${leftPos.newY},left`)) {
                frontier.push({ x: leftPos.newX, y: leftPos.newY, direction: 'left' });
            }
        }
    } else if (cell === '|') {
        if (direction === 'up' || direction === 'down') {
            const { newX, newY } = getNextPosition(x, y, direction);
            if (!outOfBounds(newX, newY) && !cache.has(`${newX},${newY},${direction}`)) {
                frontier.push({ x: newX, y: newY, direction });
            }
        } else {
            // Split into 2 beams
            const upPos = getNextPosition(x, y, 'up');
            if (!outOfBounds(upPos.newX, upPos.newY) && !cache.has(`${upPos.newX},${upPos.newY},up`)) {
                frontier.push({ x: upPos.newX, y: upPos.newY, direction: 'up' });
            }
            const downPos = getNextPosition(x, y, 'down');
            if (!outOfBounds(downPos.newX, downPos.newY) && !cache.has(`${downPos.newX},${downPos.newY},down`)) {
                frontier.push({ x: downPos.newX, y: downPos.newY, direction: 'down' });
            }
        }
    }
}

console.log(visited.size);