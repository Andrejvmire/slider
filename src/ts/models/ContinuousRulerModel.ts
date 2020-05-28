import AbstractPublisher from "./AbstractPublisher";

export default class ContinuousRulerModel extends AbstractPublisher implements IPublisher, IRuler {
    private _min: number;
    private _max: number;
    private _step: number;

    constructor(private _options: ContinuousSliderOptionsType) {
        super();
        this._min =_options.ruler[0];
        this._max = _options.ruler[1];
        this._step = _options.step || 1;
    }

    get value(): RulerResponseType {
        return {
            min: this._min,
            max: this._max,
            step: this._step
        };
    }

    getPointValue(index: number): number {
        return index;
    }

}