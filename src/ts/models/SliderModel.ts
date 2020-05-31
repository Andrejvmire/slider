import AbstractPublisher from "./AbstractPublisher";
import ContinuousRulerModel from "./ContinuousRulerModel";
import PointsModel from "./PointsModel";
import ValidatorModel from "./ValidatorModel";

export default class SliderModel extends AbstractPublisher implements ISubscriber, IPublisher {
    private _ruler: IPublisher & IRuler;
    private _points: IPublisher & IPointsEvents;
    private _validator: ValidatorModel;

    constructor(_options: SliderOptionsType) {
        super();
        this._ruler = new ContinuousRulerModel(_options as ContinuousSliderOptionsType);
        this._ruler.attach(this);
        if (!this.validate(_options.points)) {
            this._validator.errors
                .map(
                    error => {
                        throw new Error(error)
                    }
                )
        }
        this._points = new PointsModel(_options.points);
        this._points.attach(this);
        this.notify();
    }

    private getRulerValue(): RulerResponseType {
        return <RulerResponseType>this._ruler.value;
    }

    private getPointsValue(): ModelResponseType {
        return {
            points: <number[]>this._points.value.points
                .map(
                    item => {
                        return this._ruler.getPointValue(item)
                    }
                )
        }
    }

    private validate(value: number | number[]): boolean {
        let {min, max} = this.getRulerValue();
        this._validator = ValidatorModel.inRange(min, max, value);
        return this._validator.validate();
    }

    next(currentValue: number): void {
        let {step} = this.getRulerValue(),
            nextValue = currentValue + step;
        if (this.validate(nextValue)) {
            this._points.moveTo(currentValue, nextValue);
        }
    }

    prev(currentValue: number): void {
        let {step} = this.getRulerValue(),
            nextValue = currentValue - step;
        if (this.validate(nextValue)) {
            this._points.moveTo(currentValue, nextValue);
        }
    }

    move(newValue: number): void {
        if (this.validate(newValue)) {
            this._points.move(newValue);
        }
    }

    update(data:ModelResponseType): void {
        this.notify(data);
    }

    get value(): ModelResponseType {
        return {
            ...this.getRulerValue(),
            ...this.getPointsValue()
        };
    }
}