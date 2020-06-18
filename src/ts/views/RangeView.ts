export default class RangeView implements IViewSubscriber, IView {
    private static className: string = 'slider slider__range';
    private readonly $_instance: JQuery;
    private _state: [number, number];
    private readonly _side: 'left' | 'top';
    private readonly _otherSide: 'right' | 'bottom';

    constructor(points: [number, number], side?: 'left' | 'top') {
        this._side = side || 'left';
        this._otherSide = (this._side === 'left') ? 'right' : 'bottom';
        this.$_instance = $(document.createElement("div"))
            .addClass(RangeView.className);
        this.update(points);
    }

    update(value: [number, number]): void {
        this.$_instance
            .css({
                [this._side]: value[0],
                [this._otherSide]: value[1]
            });
        this._state = value;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }

    get state(): number[] {
        return this._state;
    }

}