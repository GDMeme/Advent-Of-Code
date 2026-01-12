const { readFileSync } = require('fs');

const arr = readFileSync('./input.txt', 'utf-8').split(/\r?\n/);

class MaxHeap {
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
        if (index === 0) {
            return true;
        }
    
        const val = this.valueFunc(this.arr[index]);
        const parentIndex = this.parentIndex(index);
        const parentVal = this.valueFunc(this.arr[parentIndex]);
        
        if (val > parentVal) {
            [this.arr[index], this.arr[parentIndex]] = [this.arr[parentIndex], this.arr[index]];
            return this.fixUp(parentIndex);
        }
        return true;
    }
    
    fixDown(index) {
        const val = this.valueFunc(this.arr[index]);
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;
        const left = leftIndex < this.size() ? this.valueFunc(this.arr[leftIndex]) : -Infinity;
        const right = rightIndex < this.size() ? this.valueFunc(this.arr[rightIndex]) : -Infinity;
    
        if (val >= left && val >= right) {
            return true;
        } else if (left > right) {
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

    extractMax() {
        if (this.arr.length === 0) {
            throw new Error("tried to extract max from an empty heap!")
        }
        
        if (this.arr.length === 1) {
            return this.arr.pop();
        }
        
        const val = this.arr[0];
        const lastElem = this.arr.pop();
        
        this.arr[0] = lastElem;
        this.fixDown(0);
        return val;
    }
}

const vertexArr = [];
for (const line of arr) {
    const [start, dests] = line.split(': ');
    const destinations = dests.split(' ');

    let startVertex = vertexArr.find(v => v.key === start);
    if (!startVertex) {
        startVertex = { key: start, destinations: new Set(), value: 0 };
        vertexArr.push(startVertex);
    }
    destinations.forEach(dest => startVertex.destinations.add(dest));

    for (const dest of destinations) {
        let destVertex = vertexArr.find(v => v.key === dest);
        if (!destVertex) {
            destVertex = { key: dest, destinations: new Set(), value: 0 };
            vertexArr.push(destVertex);
        }
        destVertex.destinations.add(start);
    }
}


for (let i = 0; i < vertexArr.length; i++) { // Keep going until a solution is found
    const newVertexArr = vertexArr.map(v => ({ // Deep clone vertexArr
        key: v.key,
        destinations: v.destinations,
        value: 0
    }));
    newVertexArr[i].value = 1;
    
    let heap = new MaxHeap(newVertexArr, (vertex) => vertex.value);
    // Sum of values is the total number of edge crossings
    // If it's 3, we've found our answer, just cut those three edges and it's split into 2 disconnected sets
    while (heap.arr.reduce((sum, v) => sum + v.value, 0) !== 3 && heap.arr.length !== 0) {
        const topVertex = heap.extractMax();
        
        const dests = topVertex.destinations;
        for (const dest of dests) {
            const destVertex = heap.arr.find(v => v.key === dest);
            if (destVertex) {
                destVertex.value += 1;
                
                // I don't have the index of destVertex in the heap so I can't call fixUp...
                heap = new MaxHeap(heap.arr, v => v.value); // Shouldn't have used a heap... But I've already done it
            }
        }
    }
    
    if (heap.arr.length === 0) { // Failed to find a solution with this starting vertex
        continue;
    } else {
        console.log((vertexArr.length - heap.arr.length) * heap.arr.length);
        break;
    }
}