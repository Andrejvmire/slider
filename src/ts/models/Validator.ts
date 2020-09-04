export const Validator: IValidator = class ValidatorConstructor implements IValidatorConstructor {
    private _errors: string[] = [];

    [index: string]: any;

    private constructor() {}

    inRange(value: PointsType, condition: [number, number]): ValidatorConstructor {
        const [min, max] = condition;
        const valueInRange = (value: number) => {
            if ((value < min) || (value > max)) {
                this._errors.push(`Point ${value} less then ${min} or great then ${max}`)
            }
        }
        if (typeof value === "number") {
            valueInRange(value)
        } else {
            value.map(
                valueInRange
            )
        }
        return this;
    }

    static callValidator(functionName: string, value: any, condition: any): ValidatorConstructor {
        const model = new ValidatorConstructor();
        if (functionName in model) {
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
