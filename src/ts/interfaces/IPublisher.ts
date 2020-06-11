interface IPublisher {
    attach(subscriber: ISubscriber, type: modelType): void;

    detach(subscriber: ISubscriber, type: modelType): void;

    notify(type: modelType, data?: any): void;
}

type modelType = "modelEvent" | "viewEvent";