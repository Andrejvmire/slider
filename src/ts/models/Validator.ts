import _ from "lodash";

export const Validator: IValidator = class ValidatorConstructor implements IValidatorConstructor {
    private _errors: string[] = [];

    [index: string]: any;

    private constructor() {
    }

    inRange(value: number, condition: [number, number]): ValidatorConstructor {
        const [min, max] = condition;
        if ((value < min) || (value > min)) {
            this._errors.push(`Point ${value} less then ${min} or great then ${max}`)
        }
        return this;
    }

    static callValidator(functionName: string, value: any, condition: any): ValidatorConstructor {
        const model = new ValidatorConstructor();
        if (functionName in this) {
            return model[functionName](value, condition);
        }
        return model;
    }

    get valid(): boolean {
        return (this._errors.length === 0);
    }

    get errors(): string[] {
        return this._errors;
    }
}