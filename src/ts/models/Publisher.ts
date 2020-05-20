abstract class Publisher implements IPublisher {
    protected abstract _subscribers: ISubscriber[] = [];

    abstract values(): any;

    attach(subscriber: ISubscriber): void {
        const isExist = this._subscribers.includes(subscriber);
        if (!isExist) {
            this._subscribers.push(subscriber);
        }
    }

    detach(subscriber: ISubscriber): void {
        const index = this._subscribers.indexOf(subscriber);
        if (index !== -1) {
            this._subscribers.splice(index, 1);
        }
    }

    notify(): void {
        for (const subscriber of this._subscribers) {
            subscriber.update(this.values())
        }
    }
}

export default Publisher;