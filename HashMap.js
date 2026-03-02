class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.8) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.prime = 31;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    getHash(key) {
        const strKey = key.toString();
        let hash = 0;

        for (let i = 0; i < strKey.length; i++) {
            hash = (hash * this.prime + strKey.charCodeAt(i)) % this.capacity;
        }

        return hash;
    }

    set(key, value) {
        const index = this.getHash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if (this.size / this.capacity >= this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const index = this.getHash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return pair[1];
            }
        }

        return undefined;
    }

    has(key) {
        const index = this.getHash(key);
        const bucket = this.buckets[index];

        for (let pair of bucket) {
            if (pair[0] === key) {
                return true;
            }
        }

        return false;
    }

    remove(key) {
        const index = this.getHash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }

        return false;
    }

    resize() {
        const oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
        this.size = 0;

        for (let bucket of oldBuckets) {
            for (let [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }


    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(() => []);
    }

    keys() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let [key] of bucket) {
                result.push(key);
            }
        }
        return result;
    }

    values() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let [, value] of bucket) {
                result.push(value);
            }
        }
        return result;
    }

    entries() {
        const result = [];
        for (let bucket of this.buckets) {
            for (let [key, value] of bucket) {
                result.push([key, value]);
            }
        }
        return result;
    }
}

export default HashMap;