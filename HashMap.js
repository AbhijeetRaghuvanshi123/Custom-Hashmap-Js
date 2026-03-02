class HashMap {
    constructor() {
        this.map = [];
    }

    getHash(value) {
        value = value.toString();
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            sum += value.charCodeAt(i);
        }
        return sum;
    }

    set(key, value){
        const hashValue = this.getHash(key);
        this.map[hashValue] = value;
    }

    get(key){
        const hashValue = this.getHash(key);
        return this.store[hashValue];
    }

    has(key){
        const hashValue = this.getHash(key);
        return this.map[hashValue] != null;
    }

    remove(key){
        const hashValue = this.getHash(key);
        this.store[hashValue] = null;
    }
}
