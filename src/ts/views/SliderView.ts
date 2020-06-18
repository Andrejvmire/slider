import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import PointView from "./PointView";
import RulerView from "./RulerView";
import TooltipView from "./TooltipView";

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber {
    private value: [number] | [number, number];
    private _points: IViewPublisher[] = [];
    private _tooltips: IView[] = [];
    private _ruler: IView;
    private _side: "left" | "top";
    private $_container: JQuery;
    private static className: string = 'slider slider__container';

    constructor(private options: ViewOptionsType, private parent: JQuery) {
        super();
        this.value = (typeof options.points === "number") ? [options.points] : options.points;
        this.$_container = parent
            .addClass(SliderView.className);
        this.pointsInit();
        this.rulerInit();
        this.tooltipInit();
        this.render();
    }

    private render(): void {
        this._ruler.$instance
            .append(
                this._points.map(
                    (point, index) => {
                        return point.$instance
                            .append(this._tooltips[index].$instance)
                    }
                )
            )
            .appendTo(this.$_container);
    }

    private tooltipInit(): void {
        let {tooltip} = this.options;
        if (tooltip) {
            this._tooltips = this.value.map(
                point => new TooltipView(point, this._side)
            )
        }
    }

    private rulerInit(): void {
        this._ruler = new RulerView(this.options.ruler);
    }

    private pointsInit(): void {
        let {orientation, ruler} = this.options;
        this._side =
            ((orientation === 'horizontal') || (typeof orientation === "undefined"))
                ?
                "left"
                :
                "top";
        this._points = this.value
            .sort()
            .map(
                point => new PointView(SliderView.pointInPercents(point, ruler), this._side, this)
            )
    }

    private static pointInPercents(part: number, from: [number, number]): number {
        return (part - from[0]) * 100 / from.reduce((p, c) => c - p);
    }

    update(value: number): void {
        let [from, to] = this.options.ruler;
        this.value = <[number] | [number, number]>this._points.map(
            point => {
                let number: number;
                if (typeof point.state !== "number") {
                    number = point.state[0];
                } else {
                    number = point.state;
                }
                return Math.floor(number * (to - from) / 100)
            }
        )
    }

}