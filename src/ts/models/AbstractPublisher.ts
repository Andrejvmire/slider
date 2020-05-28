export default abstract class AbstractPublisher implements IPublisher {
    protected _subscribers: ISubscriber[] = [];

    attach(subscriber: ISubscriber): void {
        let isExist: boolean = this._subscribers
            .includes(subscriber);
        if (!isExist) {
            this._subscribers.push(subscriber);
        }
    }

    detach(subscriber: ISubscriber): void {
        let index = this._subscribers
            .indexOf(subscriber);
        if (index !== -1) {
            this._subscribers.splice(index, 1);
        }
    }

    notify(): void {
        for (let subscriber of this._subscribers) {
            subscriber.update(this.value)
        }
    }

    abstract get value(): ModelResponseType;
    abstract set value(newValue: ModelResponseType);

}