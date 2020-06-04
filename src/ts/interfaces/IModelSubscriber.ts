interface IModelSubscriber extends ISubscriber {
    update(data: ModelResponseType): void;
}