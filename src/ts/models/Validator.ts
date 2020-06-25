import _ from "lodash";

export default class Validator implements IValidator {
    private _errors: string[] = [];

    static inRange(ruler: IRuler, points: IPoints | number): Validator {
        const model: Validator = new Validator();
        const {min, max} = ruler.state;
        let values: number[] = [];
        if (typeof points === "number") {
            values.push(points);
        } else {
            values = _.concat(values, points.state);
        }
        values
            .map(point => {
                if ((point < min) || (point > max)) {
                    model._errors
                        .push(`Point ${point} less then ${min} or great then ${max}`)
                }
            })
        return model;
    }

    get valid(): boolean {
        return (this._errors.length === 0);
    }

    get errors(): string[] {
        return this._errors;
    }
}