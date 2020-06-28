export default abstract class AbstractPublisher implements IPublisher {
    private _subscribers: Set<ISubscriber> = new Set<ISubscriber>();
    state: any;

    attach(subscriber: ISubscriber): void {
        this._subscribers.add(subscriber);
    }

    detach(subscriber: ISubscriber): void {
        this._subscribers.delete(subscriber);
    }

    notify(data?: any): void {
        this._subscribers.forEach(
            subscriber => subscriber.update(data || this.state)
        )
    }
}