import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MaxScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "max";

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            more: "min"
        };
    }

}

export default MaxScaleChainHandler;