import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MaxScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "max";
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected checkValue(request: TModelOptions): boolean {
        return true;
    }

}

export default MaxScaleChainHandler;