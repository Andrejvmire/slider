import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import $ from 'jquery';
import {pointInPercents} from "./pointInPercents";

export default class PointView extends AbstractViewPublisher implements IViewPublisher, IPoint {
    private className: string[] = ['slider', 'slider__point'];
    private _state: number;

    constructor(state: number, private _side: SideType, private _ruler: RulerType, private _orientation: SliderOrientationType) {
        super();
        this.$_instance = $(document.createElement('span'));
        this.addClass();
        this.moveTo(state);
    };

    private addClass(): void {
        this.className.push(
            `slider__point_${this._orientation}`
        );
        this.$_instance
            .addClass(this.className);
    }

    moveTo(point: number): void {
        point = pointInPercents(point, this._ruler);
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
