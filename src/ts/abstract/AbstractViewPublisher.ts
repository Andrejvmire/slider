import AbstractPublisher from "./AbstractPublisher";

export default abstract class AbstractViewPublisher extends AbstractPublisher implements IViewPublisher {
    protected _eventType: modelType = "viewEvent";
    protected $_instance: JQuery;

    attach(subscriber: IViewSubscriber) {
        super.attach(subscriber, this._eventType);
    }

    detach(subscriber: IViewSubscriber) {
        super.detach(subscriber, this._eventType);
    }

    notify() {
        super.notify(this._eventType);
    }

    get $instance(): JQuery {
        return this.$_instance;
    }
}