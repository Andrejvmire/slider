import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import PointView from "./PointView";
import RulerView from "./RulerView";
import TooltipView from "./TooltipView";
import RangerView from "./RangerView";

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber {
    private value: [number] | [number, number];
    private _points: IViewPublisher[] = [];
    private _tooltips: IView[] = [];
    private _ruler: IView;
    private _ranger: IView & IViewSubscriber;
    private _side: "left" | "top";
    private readonly $_container: JQuery;
    private static className: string = 'slider slider__container';

    constructor(private options: ViewOptionsType, private parent: JQuery) {
        super();
        this.value = (typeof options.points === "number") ? [options.points] : options.points;
        this.$_container = parent
            .addClass(SliderView.className);
        this.pointsInit();
        this.rulerInit();
        this.tooltipInit();
        this.rangerInit();
        this.render();
    }

    private static appendView(view: IView, parent: IView): JQuery {
        if (typeof view !== "undefined") {
            view.$instance
                .appendTo(parent.$instance);
        }
        return parent.$instance;
    }

    private render(): void {
        SliderView.appendView(this._ranger, this._ruler);
        this._ruler.$instance
            .append(
                this._points.map(
                    (point, index) => {
                        return SliderView.appendView(this._tooltips[index], point)
                    }
                )
            )
            .appendTo(this.$_container);
    }

    private rangerInit(): void {
        if (this._points.length === 2) {
            let value = <[number, number]>this._points
                .map(
                    point => point.state
                )
            this._ranger = new RangerView(value, this._side);
        }
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