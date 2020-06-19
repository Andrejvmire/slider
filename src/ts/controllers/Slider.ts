import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";

export default class Slider implements ISubscriber {
    private _model: ISlider;
    private _view: IViewPublisher;

    constructor(options: MainOptionsType, parent: JQuery) {
        this._model = new SliderModel({
            ...options
        });
        this._view = new SliderView({points: [60,257], ruler: [20, 400], tooltip: true}, parent);
        this._model.attach(this);
    }

    update(data?: any): void {
    }
}