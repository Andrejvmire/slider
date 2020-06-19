import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import $ from 'jquery';
import TooltipView from "./TooltipView";

export default class PointView extends AbstractViewPublisher implements IViewPublisher {
    private readonly _side: 'top' | 'left';
    private _position: number;
    private static className: string = 'slider slider__point';

    constructor(position: number, side: 'top' | 'left', subscriber?: IViewSubscriber) {
        super();
        if (typeof subscriber !== "undefined") this.attach(subscriber);
        this._side = side;
        this.$_instance = $(document.createElement('span'));
        this.$_instance.addClass(PointView.className);
        this.moveTo(position);
    };

    moveTo(point: number): void {
        this._position = point;
        this.$_instance
            .css(this._side, `${this._position}%`);
        // this.notify();
    }

    get state(): number {
        return this._position;
    }
}