import AbstractChainHandler from "./abstract/AbstractChainHandler";

class ToScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "to";

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            less: "max",
            more: "to",
            multiple: "step"
        };
    }

}

export default ToScaleChainHandler;