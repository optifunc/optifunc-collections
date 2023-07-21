import { ObservableList, ChangeType, IChangeListener } from './ObservableList';

describe('ObservableList', () => {
    let list: ObservableList<number>;
    let callback: IChangeListener<number>;

    beforeEach(() => {
        list = new ObservableList<number>();
        callback = jest.fn();
        list.subscribe(callback);
    });

    test('should allow adding items and notify listeners', () => {
        list.add(1);
        expect(list.get(0)).toBe(1);
        expect(callback).toHaveBeenCalledWith(ChangeType.Add, 1, 0);
    });

    test('should allow inserting items and notify listeners', () => {
        list.add(1);
        list.insert(0, 2);
        expect(list.get(0)).toBe(2);
        expect(callback).toHaveBeenCalledWith(ChangeType.Add, 2, 0);
    });

    test('should allow removing items and notify listeners', () => {
        list.add(1);
        list.remove(1);
        expect(list.count()).toBe(0);
        expect(callback).toHaveBeenCalledWith(ChangeType.Remove, 1, 0);
    });

    test('should allow removing items at specific index and notify listeners', () => {
        list.add(1);
        list.removeAt(0);
        expect(list.count()).toBe(0);
        expect(callback).toHaveBeenCalledWith(ChangeType.Remove, 1, 0);
    });

    test('should allow updating items at specific index and notify listeners', () => {
        list.add(1);
        list.set(0, 2);
        expect(list.get(0)).toBe(2);
        expect(callback).toHaveBeenCalledWith(ChangeType.Update, 2, 0);
    });

    test('should allow clearing the list and notify listeners', () => {
        list.add(1);
        list.clear();
        expect(list.count()).toBe(0);
        expect(callback).toHaveBeenNthCalledWith(2, ChangeType.Clear, undefined, undefined);
    });

    test('should correctly handle unsubscribe', () => {
        list.unsubscribe(callback);
        list.add(1);
        expect(callback).not.toHaveBeenCalled();
    });
});