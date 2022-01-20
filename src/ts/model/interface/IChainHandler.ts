interface IChainHandler {
    setNext(handler: IChainHandler): IChainHandler;

    handle(request: TSliderOptions): boolean;
}