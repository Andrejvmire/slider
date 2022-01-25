import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MinScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = 'min';
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected checkValue(request: TModelOptions): boolean {
        return true;
    }

}

export default MinScaleChainHandler;