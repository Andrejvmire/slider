export default class TooltipView implements IViewSubscriber, IView {
    private _state: number;
    private $_instance: JQuery<HTMLElement>;
    private static className: string = 'slider slider__tooltip';

    constructor(point: number, private side: "left" | "top") {
        this.$_instance = $(document.createElement("span")).
            addClass(TooltipView.className);
        this.update(point);
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