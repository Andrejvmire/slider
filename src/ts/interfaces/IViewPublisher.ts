interface IViewPublisher extends IPublisher {
    notify(data: ViewResponseType): void;

    value: JQuery
}