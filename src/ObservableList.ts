import { List } from './List'

export enum ChangeType {
    Add = 'add',
    Remove = 'remove',
    Update = 'update',
    Clear = 'clear'
}

export interface IChangeListener<T> {
    (changeType: ChangeType, item?: T, index?: number): void;
}

export class ObservableList<T> extends List<T> {
    private listeners: IChangeListener<T>[] = [];

    add(item: T): void {
        super.add(item);
        this.notify(ChangeType.Add, item, this.count() - 1);
    }

    insert(index: number, item: T): void {
        super.insert(index, item);
        this.notify(ChangeType.Add, item, index);
    }

    remove(item: T): void {
        const index = this.list.indexOf(item);
        if (index !== -1) {
            super.remove(item);
            this.notify(ChangeType.Remove, item, index);
        }
    }

    removeAt(index: number): void {
        if (index >= 0 && index < this.count()) {
            const item = this.get(index);
            super.removeAt(index);
            this.notify(ChangeType.Remove, item, index);
        }
    }

    set(index: number, item: T): void {
        if (index >= 0 && index < this.count()) {
            super.set(index, item);
            this.notify(ChangeType.Update, item, index);
        }
    }

    clear(): void {
        super.clear();
        this.notify(ChangeType.Clear);
    }

    subscribe(listener: IChangeListener<T>): void {
        this.listeners.push(listener);
    }

    unsubscribe(listener: IChangeListener<T>): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    private notify(changeType: ChangeType, item?: T, index?: number): void {
        this.listeners.forEach(listener => listener(changeType, item, index));
    }
}
