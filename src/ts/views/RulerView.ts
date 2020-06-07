import AbstractPublisher from "../models/AbstractPublisher";
import _ from "lodash";

export default class RulerView extends AbstractPublisher implements IViewPublisher, IViewInstance {
    private _$instance: JQuery;
    private _className: string[] = ['slider', 'slider__ruler', 'js-slider-ruler']

    constructor(options: RulerViewOptionsType) {
        super();
        this._className = _.concat(this._className, options.className);
    }

    get value(): JQuery {
        return this._$instance;
    };

    render(parent: JQuery): void {
        parent.addClass(this._className);
    }
}