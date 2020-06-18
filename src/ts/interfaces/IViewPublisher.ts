interface IViewPublisher extends IPublisher {
    attach(subscriber: ISubscriber): void;

    detach(subscriber: ISubscriber): void;

    notify(): void;

    state: number | number[];

    $instance: JQuery;
}