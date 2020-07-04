import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import $ from 'jquery';
import {pointInPercents} from "./pointInPercents";

export default class PointView extends AbstractViewPublisher implements IViewPublisher, IPoint {
    private static className: string = 'slider slider__point';
    private _state: number;

    constructor(state: number, private _side: 'top' | 'left', private _ruler: [number, number]) {
        super();
        this.$_instance = $(document.createElement('span'));
        this.$_instance.addClass(PointView.className);
        state = pointInPercents(state, _ruler);
        this.moveTo(state);
    };

    moveTo(point: number): void {
        if (point < 0 || point > 100) return;
        this._state = point;
        this.$_instance
            .css(this._side, `${this._state}%`);
        this.notify();
    }

    get state(): number {
        return this.round(this._state);
    }

    private round(point: number): number {
        const [min, max] = this._ruler;
        return Math.round(point * (max - min) / 100) + min
    }
}
