import AbstractChainHandler from "./abstract/AbstractChainHandler";

class MaxScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "max";
    protected referenceField?: Partial<keyof TModelOptions> = undefined;

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            more: "min"
        };
    }

}

export default MaxScaleChainHandler;