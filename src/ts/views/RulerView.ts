export default class RulerView implements IView {
    private $_instance: JQuery;
    private readonly _state: number[];
    private static className: string = 'slider slider__ruler';

    constructor(scope: [number, number]) {
        this.$_instance = $(document.createElement("div"))
            .addClass(RulerView.className);
        this._state = scope;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }

    get state(): number[] {
        return this._state;
    }
}