export default class ValidatorModel {
    private _result: boolean = true;
    private _errors: string[] = [];

    private constructor() {
    }

    private setError(message: string): void {
        this._errors.push(message);
    }

    static inRange(min: number, max: number, value: number | number[]) {
        let model = new ValidatorModel(),
            result: boolean;
        if (typeof value === 'object') {
            value.map(
                item => {
                    if ((item < min) && (item > max)) {
                        model._result = false;
                        model.setError(`Value ${item} isn't in range: less then ${min} or more then ${max}`)
                    }
                }
            )
        } else {
            result = (value >= min) && (value <= max);
            if (!result) {
                model._result = false;
                model.setError(`Value ${value} isn't in range: less then ${min} or more then ${max}`)
            }
        }
        return model;
    }

    validate(): boolean {
        return this._result;
    }

    get errors(): string[] {
        return this._errors;
    }

}