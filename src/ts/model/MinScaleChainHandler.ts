import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MinScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = 'min';
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            less: "max"
        };
    }

}

export default MinScaleChainHandler;