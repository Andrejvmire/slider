interface IModelPublisher extends IPublisher {
    attach(subscriber: ISubscriber): void;

    detach(subscriber: ISubscriber): void;

    notify(): void;
}