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
        let newPoint = pointInPercents(point, this._ruler);
        if (newPoint < 0 || newPoint > 100) return;
        this._state = point;
        this.$_instance
            .css(this._side, `${newPoint}%`);
        this.notify();
    }

    get state(): number {
        return this._state;
    }
}
