interface IPublisher {
    attach(subscriber: ISubscriber): void;

    detach(subscriber: ISubscriber): void;

    notify(): void;
}