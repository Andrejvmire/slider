interface IPublisher {
    attach(subscriber: ISubscriber, type: TPublisher | TPublisher[]): IPublisher;

    detach(subscriber: ISubscriber, type: TPublisher): IPublisher;

    notify(type: TPublisher): IPublisher;

    notify(type: TPublisher[]): IPublisher;
}
