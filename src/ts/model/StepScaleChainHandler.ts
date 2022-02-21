import AbstractChainHandler from "./abstract/AbstractChainHandler";
import {injectable} from "tsyringe";

@injectable()
class StepScaleChainHandler extends AbstractChainHandler<TModelOptions> {
    protected field: Partial<keyof TModelOptions> = "step";

    protected rules(): TValidatorRules<IValidator<TModelOptions>, TModelOptions> {
        return {};
    }

}

export default StepScaleChainHandler;