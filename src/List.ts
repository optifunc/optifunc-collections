export class List<T> implements Iterable<T> {
    protected list: T[] = [];

    add(item: T): void {
        this.list.push(item);
    }

    insert(index: number, item: T): void {
        this.list.splice(index, 0, item);
    }

    remove(item: T): void {
        const index = this.list.indexOf(item);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    removeAt(index: number): void {
        if (index >= 0 && index < this.list.length) {
            this.list.splice(index, 1);
        }
    }

    get(index: number): T {
        return this.list[index];
    }

    set(index: number, item: T): void {
        this.list[index] = item;
    }

    contains(item: T): boolean {
        return this.list.includes(item);
    }

    count(): number {
        return this.list.length;
    }

    clear(): void {
        this.list = [];
    }

    [Symbol.iterator](): Iterator<T> {
        let index = -1;
        return {
            next: () => ({value: this.list[++index], done: index >= this.list.length})
        };
    }
}