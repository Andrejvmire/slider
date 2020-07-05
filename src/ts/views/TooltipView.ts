import $ from 'jquery';

export default class TooltipView implements IViewSubscriber, IView {
    private _state: number;
    private readonly $_instance: JQuery;
    private static className: string = 'slider slider__tooltip';

    constructor(point: number, private _orientation: SliderOrientationType) {
        this.$_instance = $(document.createElement("span")).addClass(TooltipView.className);
        this.orientation();
        this.update(point);
    }

    private orientation(): void {
        const width = this.$_instance.width() || 0;
        if (this._orientation === 'horizontal') {
            this.$_instance
                .css("top", "1.1rem")
        } else {
            this.$_instance
                .css("left", width + 18)
        }
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