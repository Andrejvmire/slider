interface IChainHandler<T> {
    setNext(handler: IChainHandler<T>): IChainHandler<T>;

    handle(request: Partial<T>): boolean;
}