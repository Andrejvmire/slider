import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MinScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = 'min';

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            less: "max"
        };
    }

}

export default MinScaleChainHandler;