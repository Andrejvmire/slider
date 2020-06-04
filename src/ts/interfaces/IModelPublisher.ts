interface IModelPublisher extends IPublisher {
    notify(data: ModelResponseType): void;

    value: ModelResponseType;
}