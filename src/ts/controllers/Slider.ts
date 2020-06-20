import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";
import _ from "lodash";

export default class Slider implements ISubscriber, IViewSubscriber {
    private _model: ISlider;
    private _view: IViewPublisher;

    constructor(options: MainOptionsType, parent: JQuery) {
        this._model = new SliderModel({
            ...options
        });
        this._view = new SliderView({
            ...options
        }, parent);
        this._model.attach(this);
        this._view.attach(this);
    }

    update(data?: any): void {
        let modelState = this._model.state.points,
            viewState = this._view.state;
        console.log(data);
        if (_.difference(modelState, data).length === 0){
            console.log('Good!')
        }
    }
}