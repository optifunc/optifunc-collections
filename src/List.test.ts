import { List } from './List';

describe('List', () => {
    let list: List<number>;

    beforeEach(() => {
        list = new List<number>();
    });

    test('should allow adding items', () => {
        list.add(1);
        expect(list.get(0)).toBe(1);
    });

    test('should allow inserting items', () => {
        list.add(1);
        list.insert(0, 2);
        expect(list.get(0)).toBe(2);
    });

    test('should allow removing items', () => {
        list.add(1);
        list.remove(1);
        expect(list.count()).toBe(0);
    });

    test('should allow removing items at specific index', () => {
        list.add(1);
        list.removeAt(0);
        expect(list.count()).toBe(0);
    });

    test('should allow updating items at specific index', () => {
        list.add(1);
        list.set(0, 2);
        expect(list.get(0)).toBe(2);
    });

    test('should allow clearing the list', () => {
        list.add(1);
        list.clear();
        expect(list.count()).toBe(0);
    });

    test('should be iterable', () => {
        list.add(1);
        list.add(2);
        let count = 0;
        for (let item of list) {
            count++;
        }
        expect(count).toBe(2);
    });

    test('should correctly handle contains', () => {
        list.add(1);
        expect(list.contains(1)).toBe(true);
        expect(list.contains(2)).toBe(false);
    });
});
