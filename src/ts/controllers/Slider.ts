import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";
import _ from "lodash";

export default class Slider implements ISubscriber, IViewSubscriber {
    private _model: ISlider & ISubscriber;
    private _view: ISlider & IViewPublisher;

    constructor(options: MainOptionsType, parent: JQuery) {
        this._model = new SliderModel({
            ...options
        });
        this._view = new SliderView({
            ...options, points: this._model.state
        }, parent);
        this._model.attach(this);
        this._view.attach(this);
    }

    update(data?: any): void {
        let modelState = this._model.state,
            viewState = <number[]>this._view.state;
        let viewDif = _.difference(viewState, modelState)[0],
            modelDif = _.difference(modelState, viewState)[0];
        if (_.difference(data, modelState).length !== 0) {
            this._model.move(viewDif, modelDif);
        } else if (_.difference(data, viewState)) {
            this._view.move(modelDif, viewDif);
        }
    }
}