import $ from 'jquery';

export default class RulerView implements IView {
    private $_instance: JQuery;
    private readonly _state: number[];
    private className: string = 'slider slider__ruler';

    constructor(scope: RulerType, private _orientation: SliderOrientationType) {
        this.$_instance = $(document.createElement("div"))
            .addClass(this.className);
        this.orientation();
        this._state = scope;
    }

    private orientation(): void {
        this.$_instance
            .addClass(`slider__ruler_${this._orientation}`)
    }

    get $instance(): JQuery {
        return this.$_instance;
    }

    get state(): number[] {
        return this._state;
    }
}