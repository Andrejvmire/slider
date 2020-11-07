import AbstractModelPublisher from "../abstract/AbstractModelPublisher";
import RulerModel from "./RulerModel";
import PointsModel from "./PointsModel";
import ModelState from "./ModelState";

export default class SliderModel extends AbstractModelPublisher implements ISlider, ISubscriber {
    private readonly _ruler: IModel;
    private readonly _points: IPoints;
    private readonly _state: IState;
    private readonly _step: number;

    constructor(options: ModelOptionsType) {
        super();
        this._state = new ModelState();
        this._ruler = new RulerModel(this._state, options.ruler);
        this._step = options.step || 1;
        if (this._step <= 0) throw new Error("The step must be greater than 0");
        // @ts-ignore
        this._points = new PointsModel(this.setStep(options.points));
        this._points.attach(this);
    }

    update(data?: any): void {
        this.notify(data);
    }

    move(to: number, from?: number): SliderModel {
        let value = this.setStep(to);
        this._points.move(value, from);
        return this;
    }

    private setStep(value: number): number;
    private setStep(value: number[]): number[];
    private setStep(value: any): any {
        if (typeof value === "number") {
            return this.round(value - (value % this._step));
        } else if (Array.isArray(value) && typeof value === "object") {
            return value.map(
                (item: number) => this.setStep(item)
            )
        }
    }

    private round(value: number): number {
        const [, fractionalPart] = this._step
            .toString()
            .split('.');
        if (typeof fractionalPart === "undefined") return value;
        const fractionalPartLength = fractionalPart.length;
        return +value.toFixed(fractionalPartLength);
    }

    get state(): number[] {
        return this._points.state
    }
}