interface IViewPublisher extends IPublisher {
    notify(data: JQuery): void;

    value: JQuery
}