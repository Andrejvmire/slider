export default abstract class AbstractPublisher implements IPublisher {
    private _subscribers: {
        modelEvent: ISubscriber[],
        viewEvent: ISubscriber[]
    } = {
        modelEvent: [],
        viewEvent: []
    }
    state: any;

    attach(subscriber: ISubscriber, type: modelType): void {
        const isExist = this._subscribers[type].includes(subscriber);
        if (!isExist) {
            this._subscribers[type].push(subscriber);
        }
    }

    detach(subscriber: ISubscriber, type: modelType): void {
        const index = this._subscribers[type].indexOf(subscriber);
        if (index !== -1) {
            this._subscribers[type].slice(index, 1);
        }
    }

    notify(type: modelType, data?: any): void {
        for (let subscriber of this._subscribers[type]) {
            subscriber.update(data || this.state);
        }
    }
}