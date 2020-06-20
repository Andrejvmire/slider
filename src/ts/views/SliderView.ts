import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import PointView from "./PointView";
import RulerView from "./RulerView";
import TooltipView from "./TooltipView";
import RangerView from "./RangerView";

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber {
    private value: [number] | [number, number];
    private _points: (IViewPublisher & IPoint)[] = [];
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
        this.events();
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

    private percentsInPoint(event: JQuery.TriggeredEvent): number {
        let offset = this.$_container.offset(),
            relativeX = (event.pageX || 0) - (offset?.left || 0),
            relativeY = (event.pageY || 0) - (offset?.top || 0),
            width = this.$_container.width() || 1,
            height = this.$_container.height() || 1,
            percent = {
                left: (relativeX * 100) / width,
                top: (relativeY * 100) / height
            };
            return percent[this._side];
    }

    update(value: number): void {
        let [from, to] = this.options.ruler;
        this.state = <[number] | [number, number]>this._points.map(
            point => {
                let number: number;
                if (typeof point.state !== "number") {
                    number = point.state[0];
                } else {
                    number = point.state;
                }
                return Math.floor(number * (to - from) / 100) + from;
            }
        )
        this.notify();
    }

    private events(): void {
        this._points
            .map(
                point => {
                    point.$instance
                        .on('mousedown.slider__point', () => {
                            $(document).one('mousedown.slider__point', () => false);
                            $(document).one('mouseup.slider__point', () => {
                                $(document).off('mousemove.slider__point');
                            })
                            $(document).on('mousemove.slider__point', mouseMoveEvent => {
                                point.moveTo(this.percentsInPoint(mouseMoveEvent));
                                point.notify();
                            })
                        })
                }
            )
        this._ruler.$instance
            .on('click.slider__ruler', clickEvent => {
                let newPoint = this.percentsInPoint(clickEvent);
                this._points
                    .reduce(
                        ((previousValue, currentValue) =>
                            (Math.abs(previousValue.state - newPoint) <= Math.abs(currentValue.state - newPoint))
                                ? previousValue
                                : currentValue)
                    )
                    .moveTo(newPoint);
            })
    }

}