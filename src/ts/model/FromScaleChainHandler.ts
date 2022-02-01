import AbstractChainHandler from "./abstract/AbstractChainHandler";

class FromScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "from";

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            less: "max",
            more: "min",
            multiple: "step"
        };
    }

}

export default FromScaleChainHandler;