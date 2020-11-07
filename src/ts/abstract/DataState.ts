export default abstract class DataState implements IState {
    private readonly _state: Map<string, any>;
    private _subscribers: Set<ISubscriber> = new Set<ISubscriber>();

    constructor(initState: any = {}) {
        this._state = new Map<string, any>(Object.entries(initState));
    }

    setState(fieldName: string, value: any): DataState {
        this._state.set(fieldName, value);
        this.notify();
        return this;
    }

    getState(): IterableIterator<[string, any]>;
    getState(fieldName: string): any;
    getState(fieldName?: any): any {
        if (typeof fieldName === "undefined") {
            return this._state;
        } else {
            return this._state.get(fieldName);
        }
    }

    attach(subscriber: ISubscriber): void {
        this._subscribers.add(subscriber);
    }

    detach(subscriber: ISubscriber): void {
        this._subscribers.delete(subscriber);
    }

    notify(): void {
        this._subscribers.forEach(
            subscriber => subscriber.update(this._state)
        )
    }
}
