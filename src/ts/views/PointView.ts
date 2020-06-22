import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import $ from 'jquery';
import {pointInPercents} from "./pointInPercents";

export default class PointView extends AbstractViewPublisher implements IViewPublisher {
    private readonly _side: 'top' | 'left';
    private _position: number;
    private readonly _ruler: [number, number];
    private static className: string = 'slider slider__point';

    constructor(value: number, side: 'top' | 'left', ruler: [number, number]) {
        super();
        this._side = side;
        this._ruler = ruler;
        this.$_instance = $(document.createElement('span'));
        this.$_instance.addClass(PointView.className);
        this._position = pointInPercents(value, ruler);
        this.moveTo(this._position);
    };

    moveTo(point: number): void {
        if (point < 0 || point > 100) return;
        this._position = point;
        this.$_instance
            .css(this._side, `${this._position}%`);
        this.notify();
    }

    get state(): number {
        return this._position;
    }
}