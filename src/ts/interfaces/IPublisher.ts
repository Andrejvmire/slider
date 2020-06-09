interface IPublisher {
    attach(subscriber: ISubscriber, type: modelType): void;

    detach(subscriber: ISubscriber, type: modelType): void;

    notify(type: modelType): void;
}

type modelType = "modelEvent" | "viewEvent";