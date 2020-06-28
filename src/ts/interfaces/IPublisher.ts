interface IPublisher extends IModel {
    attach(subscriber: ISubscriber): void;

    detach(subscriber: ISubscriber): void;

    notify(data?: any): void;
}