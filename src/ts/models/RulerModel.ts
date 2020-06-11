export default class RulerModel implements IRuler {
    private readonly _min: number;
    private readonly _max: number;

    constructor(options: [number, number]) {
        this._min = options[0];
        this._max = options[1];
    }

    get state(): RulerResponseType {
        return {
            min: this._min,
            max: this._max
        }
    }
}