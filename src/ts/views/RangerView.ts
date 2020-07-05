import {pointInPercents} from "./pointInPercents";
import $ from 'jquery';

export default class RangerView implements IViewSubscriber, IView {
    private static className: string = 'slider slider__ranger';
    private readonly $_instance: JQuery;
    private readonly _ruler: RulerType;
    private _state: [number, number];
    private readonly _side: SideType;
    private readonly _size: 'width' | 'height';

    constructor(points: [number, number], ruler: RulerType, side?: SideType) {
        this._side = side || 'left';
        this._ruler = ruler;
        this._size = (this._side === 'left') ? 'width' : 'height';
        this.$_instance = $(document.createElement("div"))
            .addClass(RangerView.className);
        this.update(points);
    }

    update(values: [number, number]): void {
        values = <[number, number]>values.sort((a, b) => a - b)
            .map(
                value => pointInPercents(value, this._ruler)
            );
        this.$_instance
            .css({
                [this._side]: `${values[0]}%`,
                [this._size]: `${values[1] - values[0]}%`
            });
        this._state = values;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }

    get state(): number[] {
        return this._state;
    }

}