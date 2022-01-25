import AbstractChainHandler from "./abstract/AbstractChainHandler";

class StepScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "step";
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected checkValue(request: TModelOptions): boolean {
        return true;
    }

}

export default StepScaleChainHandler;