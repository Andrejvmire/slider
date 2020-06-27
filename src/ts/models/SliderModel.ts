import AbstractModelPublisher from "../abstract/AbstractModelPublisher";
import RulerModel from "./RulerModel";
import PointsModel from "./PointsModel";
import Validator from "./Validator";
import ValidationErrors from "./ValidationErrors";

export default class SliderModel extends AbstractModelPublisher implements ISlider, ISubscriber {
    private readonly _ruler: IModel;
    private readonly _points: IPoints;
    private _validator: IValidator;
    private readonly _step: number;

    constructor(options: ModelOptionsType) {
        super();
        this._ruler = new RulerModel(options.ruler);
        this._step = options.step || 1;
        if (this._step <= 0) throw new Error("The step must be greater than 0");
        // fixme: разобраться, почему выдает ошибку
        // @ts-ignore
        this._points = new PointsModel(this.setStep(options.points));
        this.inRangeValidate();
        this._points.attach(this);
    }

    private inRangeValidate(points?: number): void {
        const point = points || this._points;
        this._validator = Validator.inRange(this._ruler, point);
        if (!this._validator.valid) {
            new ValidationErrors(this._validator);
        }
    }

    update(data?: any): void {
        this.notify(data);
    }

    move(to: number, from?: number): SliderModel {
        let value = this.setStep(to);
        try {
            this.inRangeValidate(value);
            this._points.move(value, from);
        } catch (e) {
            this.notify();
        }
        return this;
    }

    private setStep(value: number): number;
    private setStep(value: number[]): number[];
    private setStep(value: any): any {
        if (typeof value === "number") {
            return value - (value % this._step);
        } else if (Array.isArray(value) && typeof value === "object") {
            return value.map(
                (item: number) => this.setStep(item)
            )
        }
    }

    get state(): number[] {
        return this._points.state
    }
}