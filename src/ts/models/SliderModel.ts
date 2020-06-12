import AbstractModelPublisher from "../abstract/AbstractModelPublisher";
import RulerModel from "./RulerModel";
import PointsModel from "./PointsModel";
import Validator from "./Validator";
import ValidationErrors from "./ValidationErrors";

export default class SliderModel extends AbstractModelPublisher implements ISlider, ISubscriber {
    private readonly _ruler: IModel;
    private readonly _points: IPoints;
    private _validator: IValidator;

    constructor(options: ModelOptionsType) {
        super();
        this._ruler = new RulerModel(options.ruler);
        this._points = new PointsModel(options.points, options.step);
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
        try {
            this.inRangeValidate(to);
            this._points.move(to, from);
        } catch (e) {

        }
        return this;
    }

    get state(): any {
        return {
            ruler: this._ruler.state,
            points: this._points.state
        }
    }
}