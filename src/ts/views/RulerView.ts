import $ from 'jquery';

export default class RulerView implements IView {
    private $_instance: JQuery;
    private readonly _state: number[];
    private static className: string = 'slider slider__ruler';

    constructor(scope: [number, number], private _orientation: 'horizontal' | 'vertical') {
        this.$_instance = $(document.createElement("div"))
            .addClass(RulerView.className);
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