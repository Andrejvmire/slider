import {isUndefined} from "lodash";

abstract class AbstractChainHandler implements IChainHandler {
    private nextHandler?: IChainHandler;

    public handle(request: TSliderOptions): boolean {
        const checkValue = this.checkValue(request);
        if (!isUndefined(this.nextHandler) && checkValue) {
            this.nextHandler.handle(request);
        }
        return checkValue;
    }

    public setNext(handler: IChainHandler): IChainHandler {
        this.nextHandler = handler;
        return handler;
    }

    protected abstract checkValue(request: TSliderOptions): boolean;

}

export default AbstractChainHandler;