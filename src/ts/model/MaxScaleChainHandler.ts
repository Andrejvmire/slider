import AbstractChainHandler from "./abstract/AbstractChainHandler";
import {injectable} from "tsyringe";

@injectable()
class MaxScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "max";

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {
            more: "min"
        };
    }

}

export default MaxScaleChainHandler;