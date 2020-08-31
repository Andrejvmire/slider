import DataState from "./DataState";
import {Validator} from "./Validator";

type ConditionObjectType = {
    field: string,
}

type ConditionStringType = string;

type Condition = ConditionObjectType | ConditionStringType;

type RuleType = {
    [index: string]: [string, Condition],
}

abstract class ValidDataState extends DataState {
    private _validator: IValidatorConstructor | undefined;

    // класс должен возвращать набор правил для валидации
    abstract rules(): RuleType[];

    setState(fieldName: string, value: any): DataState {
        for (let rule of this.rules()) {
            if (fieldName in rule) {
                let [validationFunction, condition] = rule[fieldName];
                if (typeof condition === "object") {
                    this._validator = Validator.callValidator(validationFunction, value, condition);
                    if (this._validator.valid) {
                        super.setState(fieldName, value);
                    }
                }
            }
        }
        return this;
    }

    getState(fieldName?: string): any {
        return super.getState(fieldName);
    }
}