export default class TooltipView implements IViewSubscriber, IView {
    private _state: number;
    private $_instance: JQuery;
    private static className: string = 'slider slider__tooltip';

    constructor(point: number, private _orientation: 'horizontal' | 'vertical') {
        this.$_instance = $(document.createElement("span")).
            addClass(TooltipView.className);
        this.orientation();
        this.update(point);
    }

    private orientation(): void {
        let width = this.$_instance.width() || 0;
        if (this._orientation === 'horizontal') {
            this.$_instance
                .css("top", "1.1rem")
        } else {
            this.$_instance
                .css("left", width + 18)
        }
    }

    update(value: number): void {
        this.$_instance
            .html(String(value))
    }

    get state(): number {
        return this._state;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }
}