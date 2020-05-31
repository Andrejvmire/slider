import _ from "lodash";
import Model from "../models/Model";

export default class PointView implements IPublisher {
    private readonly _instance: JQuery;
    private static _className: string[] = ['slider','slider__point'];

    constructor(_options: PointViewOptionsType) {
        PointView._className = _.concat(PointView._className, _options.className);
        this._instance = $(document.createElement('span'))
            .addClass(PointView._className);
        this.moveTo(_options.position);
    }

    moveTo(point: PositionType): PointView {
        this._instance
            .offset(point);
        return this;
    }

    get value(): JQuery {
        return this._instance;
    }
};