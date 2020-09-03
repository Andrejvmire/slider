import Singleton from "../models/Singleton";

export default abstract class DataState extends Singleton implements IPublisher {
    private _state: any = {};
    private _subscribers: Set<ISubscriber> = new Set<ISubscriber>();

    setState(fieldName: string, value: any): DataState {
        this._state[fieldName] = value;
        this.notify();
        return this;
    }

    getState(fieldName?: string): any {
        if (typeof fieldName === "undefined") {
            return this._state;
        }
        return this._state[fieldName];
    }

    attach(subscriber: ISubscriber): void {
        this._subscribers.add(subscriber);
    }

    detach(subscriber: ISubscriber): void {
        this._subscribers.delete(subscriber);
    }

    notify(data?: any): void {
        this._subscribers.forEach(
            subscriber => subscriber.update(this._state)
        )
    }
}
