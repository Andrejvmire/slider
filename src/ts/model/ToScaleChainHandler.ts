import AbstractChainHandler from "./abstract/AbstractChainHandler";

class ToScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "to";
    protected referenceField: Partial<keyof TModelOptions> = "max";

    protected checkValue(request: TModelOptions): boolean {
        return true;
    }

}

export default ToScaleChainHandler;