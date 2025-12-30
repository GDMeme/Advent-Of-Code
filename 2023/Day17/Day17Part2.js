const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

class Heap {
    constructor(arr, valueFunc = (e) => e) {
        this.arr = [];
        this.valueFunc = valueFunc;

        for (const e of arr) {
            this.insert(e);
        }
    }
    
    clear() {
        this.arr = [];
    }

    size() {
        return this.arr.length;
    }

    parentIndex(index) {
        return Math.floor((index - 1) / 2);
    }
    
    insert(elem) {
        this.arr.push(elem);
        this.fixUp(this.arr.length - 1);
    }

    fixUp(index) {
        if (index === 0)
            return true;

        const val = this.valueFunc(this.arr[index]);
        const parentIndex = this.parentIndex(index);
        const parentVal = this.valueFunc(this.arr[parentIndex]);
        
        if (val < parentVal) {
            [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
            return this.fixUp(parentIndex);
        }
        return true;
    }

    fixDown(index) {
        const val = this.valueFunc(this.arr[index]);
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        const left = leftIndex < this.size() ? this.valueFunc(this.arr[leftIndex]) : Infinity;
        const right = rightIndex < this.size() ? this.valueFunc(this.arr[rightIndex]) : Infinity;

        if (val <= left && val <= right) {
            return true;
        } else if (left < right) {
            [this.arr[index], this.arr[leftIndex]] = [this.arr[leftIndex], this.arr[index]];
            return this.fixDown(leftIndex);
        } else {
            [this.arr[index], this.arr[rightIndex]] = [this.arr[rightIndex], this.arr[index]];
            return this.fixDown(rightIndex);
        }
    }

    peek() {
        if (this.arr.length === 0) {
            console.log("tried to peek an empty heap!");
            return false;
        }
        
        return this.arr[0];
    }

    extractMin() {
        if (this.arr.length === 0) {
            throw new Error("tried to extract min from an empty heap!")
        }
        
        const val = this.arr[0];
        const lastElem = this.arr.pop();
        
        this.arr[0] = lastElem;
        this.fixDown(0);
        return val;
    }
}

function outOfBounds(x, y) {
    return x < 0 || x >= arr[0].length || y < 0 || y >= arr.length;
}

function getAvailableDirections(direction, numTimes) {
    switch (direction) {
        case 'right':
            return numTimes < 4 ? [direction] : numTimes === 10 ? ['down', 'up'] : ['right', 'down', 'up'];
        case 'down':
            return numTimes < 4 ? [direction] : numTimes === 10 ? ['left', 'right'] : ['left', 'right', 'down'];
        case 'left':
            return numTimes < 4 ? [direction] : numTimes === 10 ? ['up', 'down'] : ['left', 'up', 'down'];
        case 'up':
            return numTimes < 4 ? [direction] : numTimes === 10 ? ['right', 'left'] : ['right', 'left', 'up'];
    }
}

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

const heap = new Heap(
    [
        { x: 0, y: 0, direction: 'right', numTimes: 0, heatLoss: 0 }, 
        { x: 0, y: 0, direction: 'down', numTimes: 0, heatLoss: 0 }
    ],
    (e) => e.heatLoss
);

const cache = new Set();

let ans;
while (heap.peek()) {
    const { x, y, direction, numTimes, heatLoss } = heap.extractMin();
    
    const cacheKey = `${x},${y},${direction},${numTimes}`;
    if (cache.has(cacheKey)) {
        continue;
    }
    
    cache.add(cacheKey);
    
    const availableDirections = getAvailableDirections(direction, numTimes);
    
    for (const newDirection of availableDirections) {
        const { newX, newY } = getNextPosition(x, y, newDirection);
        if (outOfBounds(newX, newY)) {
            continue;
        }
        
        const newHeatLoss = heatLoss + parseInt(arr[newY][newX]);
        
        if (x === arr[0].length - 1 && y === arr.length - 1) {
            ans = heatLoss;
            heap.clear(); // Break out of while loop
            break;
        }
        
        const newNumTimes = newDirection === direction ? numTimes + 1 : 1;
        
        heap.insert({ x: newX, y: newY, direction: newDirection, numTimes: newNumTimes, heatLoss: newHeatLoss });
    }
}

console.log(ans);