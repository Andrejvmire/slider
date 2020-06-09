import AbstractPublisher from "./AbstractPublisher";

export default abstract class AbstractModelPublisher extends AbstractPublisher implements IModelPublisher {
    protected _eventType: modelType = "modelEvent";

    attach(subscriber: ISubscriber) {
        super.attach(subscriber, this._eventType);
    }

    detach(subscriber: ISubscriber) {
        super.detach(subscriber, this._eventType);
    }

    notify() {
        super.notify(this._eventType);
    }
}