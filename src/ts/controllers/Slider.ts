import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";
import _ from "lodash";
import AbstractPublisher from "../abstract/AbstractPublisher";

export default class Slider extends AbstractPublisher implements ISubscriber, IViewSubscriber {
    private _model: ISlider;
    private _view: ISlider;

    constructor(options: MainOptionsType, parent: JQuery) {
        super();
        this._model = new SliderModel({
            ...options
        });
        this._view = new SliderView({
            ...options, points: this._model.state
        }, parent);
        this._model.attach(this);
        this._view.attach(this);
    }

    update(data: number[]): void {
        const modelState = this._model.state;
        const viewState = this._view.state;
        const dataVsModelDif = _.difference(data, modelState)[0];
        const dataVsViewDif = _.difference(data, viewState)[0];
        if (typeof dataVsModelDif !== "undefined") {
            const modelDif = _.difference(modelState, data)[0];
            this._model.move(dataVsModelDif, modelDif);
            this.notify();
        } else if (typeof dataVsViewDif !== "undefined") {
            const viewDif = _.difference(viewState, data)[0];
            this._view.move(dataVsViewDif, viewDif);
        }
    }

    get state(): PointsType {
        return this._model.state;
    }
}
