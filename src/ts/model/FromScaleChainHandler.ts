import AbstractChainHandler from "./abstract/AbstractChainHandler";

class FromScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "from";
    protected referenceField: Partial<keyof TModelOptions> = "min";

    protected checkValue(request: TModelOptions): boolean {
        return true;
    }

}

export default FromScaleChainHandler;