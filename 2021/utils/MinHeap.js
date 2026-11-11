export class MinHeap {
    constructor(arr, valueFunc = e => e) {
        this.arr = [];
        this.valueFunc = valueFunc;

        for (const e of arr) {
            this.insert(e);
        }
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
        if (index === 0) return;

        const parent = this.parentIndex(index);

        if (this.valueFunc(this.arr[index]) < this.valueFunc(this.arr[parent])) {
            [this.arr[index], this.arr[parent]] = [this.arr[parent], this.arr[index]];
            this.fixUp(parent);
        }
    }

    fixDown(index) {
        const leftIndex = 2 * index + 1;
        const rightIndex = 2 * index + 2;

        const val = this.valueFunc(this.arr[index]);
        const left = leftIndex < this.size()
            ? this.valueFunc(this.arr[leftIndex]) : Infinity;
        const right = rightIndex < this.size()
            ? this.valueFunc(this.arr[rightIndex]) : Infinity;

        if (val <= left && val <= right) return;

        const child = left < right ? leftIndex : rightIndex;

        [this.arr[index], this.arr[child]] = [this.arr[child], this.arr[index]];
        this.fixDown(child);
    }

    extractMin() {
        if (this.arr.length === 0) {
            throw new Error("Heap is empty!");
        }

        if (this.arr.length === 1) {
            return this.arr.pop();
        }

        const min = this.arr[0];
        this.arr[0] = this.arr.pop();
        this.fixDown(0);

        return min;
    }
}
