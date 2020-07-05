import $ from 'jquery';

export default class TooltipView implements IViewSubscriber, IView {
    private _state: number;
    private readonly $_instance: JQuery;
    private className: string[] = ['slider', 'slider__tooltip'];

    constructor(point: number, private _orientation: SliderOrientationType) {
        this.$_instance = $(document.createElement("span"));
        this.addClass();
        this.update(point);
    }

    private addClass(): void {
        let orientation = `slider__tooltip_${this._orientation}`;
        this.className.push(orientation);
        this.$_instance.addClass(this.className);
    }

    update(value: number): void {
        this._state = value;
        this.$_instance
            .html(String(this._state))
    }

    get state(): number {
        return this._state;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }
}