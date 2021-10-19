interface IPublisher {
    attach(subscriber: ISubscriber, type: TPublisher): void;

    detach(subscriber: ISubscriber, type: TPublisher): void;

    notify(type: TPublisher): void;

    notify(type: TPublisher[]): void;
}
