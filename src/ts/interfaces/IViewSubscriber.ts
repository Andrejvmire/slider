interface IViewSubscriber extends ISubscriber {
    update(data: ViewResponseType): void;
}