import AbstractChainHandler from "./abstract/AbstractChainHandler";

class StepScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "step";
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {};
    }

}

export default StepScaleChainHandler;