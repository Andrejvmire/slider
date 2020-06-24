import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import RulerView from "./RulerView";
import RangerView from "./RangerView";
import TooltipsView from "./TooltipsView";
import PointsView from "./PointsView";

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber, ISlider {
    private _points: IViewPublisher & IPoints & IIterable<IViewPublisher & IPoint>;
    private _tooltips: IViewSubscriber & IIterable<IViewSubscriber & IView>;
    private _ruler: IView;
    private _ranger: IView & IViewSubscriber;
    private readonly _side: "left" | "top";
    private readonly $_container: JQuery;
    private static className: string = 'slider slider__container';

    constructor(private options: ViewOptionsType, private parent: JQuery) {
        super();
        let {orientation} = options;
        this.state = (typeof options.points === "number") ? [options.points] : options.points;
        this._side =
            ((orientation === 'horizontal') || (typeof orientation === "undefined"))
                ?
                "left"
                :
                "top";
        this.$_container = parent
            .addClass(SliderView.className);
        this.orientation();
        this.pointsInit();
        this.rulerInit();
        this.tooltipInit();
        this.rangerInit();
        this.render();
    }

    private orientation(): void {
        this.$_container
            .addClass(`slider__container_${this.options.orientation || 'horizontal'}`)
    }

    private static appendView(view: IView, parent: IView): JQuery {
        if (typeof view !== "undefined") {
            view.$instance
                .appendTo(parent.$instance);
        }
        return parent.$instance;
    }

    private render(): void {
        if (typeof this._ranger !== "undefined") {
            this._ruler.$instance.append(this._ranger.$instance);
        }
        this._ruler.$instance
            .append(
                Array.from(this._points).map(
                    (item, index) => {
                        if (this.options.tooltip) {
                            item.$instance
                                .append(
                                    Array.from(this._tooltips)[index].$instance
                                )
                        }
                        return item.$instance;
                    }
                )
            )
            .appendTo(this.$_container);
        this.events();
    }

    private rangerInit(): void {
        let {ruler} = this.options;
        if (typeof this.options.points !== "number" && this.options.points.length === 2) {
            let value = <[number, number]>this.options.points
                .map(
                    point => point
                )
            this._ranger = new RangerView(value, ruler, this._side);
            this.attach(this._ranger);
        }
    }

    private tooltipInit(): void {
        let {tooltip} = this.options;
        if (tooltip) {
            this._tooltips = new TooltipsView(this.state, this.options.orientation || 'horizontal');
            this._points.attach(this._tooltips);
        }
    }

    private rulerInit(): void {
        this._ruler = new RulerView(this.options.ruler, this.options.orientation || 'horizontal');
    }

    private pointsInit(): void {
        let {ruler} = this.options;
        this._points = new PointsView(this.state, this._side, ruler);
        this._points.attach(this);
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

    update(): void {
        this.state = this._points.state;
        this.notify();
    }

    move(to: number, from: number): ISlider {
        this._points.move(to, from);
        return this;
    }

    private events(): void {
        for (let point of this._points) {
            point.$instance
                .on('mousedown.slider__point', () => {
                    $(document).one('mousedown.slider__point', () => false);
                    $(document).one('mouseup.slider__point', () => {
                        $(document).off('mousemove.slider__point');
                    })
                    $(document).on('mousemove.slider__point', mouseMoveEvent => {
                        point.moveTo(this.percentsInPoint(mouseMoveEvent));
                    })
                })
        }
        this._ruler.$instance
            .on('click.slider__ruler', clickEvent => {
                let newPoint = this.percentsInPoint(clickEvent);
                Array.from(this._points)
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