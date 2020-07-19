import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import RulerView from "./RulerView";
import RangerView from "./RangerView";
import PointsView from "./PointsView";
import ScaleView from "./ScaleView";

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber, ISlider {
    private _points: IViewPublisher & IPoints & IIterable<IViewPublisher & IPoint>;
    private _ruler: IView;
    private _ranger: IView & IViewSubscriber;
    private _scale: IIterable<JQuery>;
    private readonly _side: SideType;
    private className: string[] = ['slider', 'slider__container'];

    constructor(private options: ViewOptionsType, private parent: JQuery) {
        super();
        const {orientation} = options;
        this.state = (typeof options.points === "number") ? [options.points] : options.points;
        this._side =
            ((orientation === 'horizontal') || (typeof orientation === "undefined"))
                ?
                "left"
                :
                "top";
        this.$_instance = parent;
        this.addClass();
        this.pointsInit();
        this.rulerInit();
        this.rangerInit();
        this.scaleInit();
        this.render();
    }

    private addClass(): void {
        this.className.push(
            `slider__container_${this.options.orientation || 'horizontal'}`
        )
        this.$_instance
            .addClass(this.className);
    }

    private render(): void {
        if (typeof this._ranger !== "undefined") {
            this._ruler.$instance.append(this._ranger.$instance);
        }
        if (typeof this._scale !== "undefined") {
            this._ruler.$instance.append(Array.from(this._scale));
        }
        this._ruler.$instance
            .append(
                Array.from(this._points).map(
                    (point) => point.$instance
                )
            )
            .appendTo(this.$_instance);
        this.events();
    }

    private scaleInit(): void {
        const {scale, ruler, orientation} = this.options;
        let point: number[];
        if (typeof scale === "undefined" || scale === false) return;
        if (typeof scale === "boolean") {
            point = ruler;
        } else {
            point = scale;
        }
        this._scale = new ScaleView(point, ruler, this._side, orientation);
    }

    private rangerInit(): void {
        let {ruler, points, ranger} = this.options;
        if (typeof points === "object" && points.length === 2) ranger = true;
        if (typeof ranger !== "undefined") {
            this._ranger = new RangerView(points, ruler, this._side, ranger);
            this.attach(this._ranger);
        }
    }

    private rulerInit(): void {
        this._ruler = new RulerView(this.options.ruler, this.options.orientation || 'horizontal');
    }

    private pointsInit(): void {
        const {ruler, orientation, tooltip} = this.options;
        this._points = new PointsView(this.state, this._side, ruler, tooltip, orientation);
        this._points.attach(this);
    }

    private percentsInPoint(event: JQuery.TriggeredEvent): number {
        const offset = this.$_instance.offset();
        const relativeX = (event.pageX || 0) - (offset?.left || 0);
        const relativeY = (event.pageY || 0) - (offset?.top || 0);
        const width = this.$_instance.width() || 1;
        const height = this.$_instance.height() || 1;
        const percent = {
            left: (relativeX * 100) / width,
            top: (relativeY * 100) / height
        };
        return percent[this._side];
    }

    private round(point: number): number {
        const [min, max] = this.options.ruler;
        return Math.round(point * (max - min) / 100) + min
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
                .on(
                    'mousedown.slider__point',
                    {$context: point},
                    this.onMouseDownOnPoint.bind(this)
                )
        }
        for (let $scaleValue of (this._scale || [])) {
            $scaleValue
                .on(
                    'click.slider__scale',
                    {state: $scaleValue.data("scaleValue")},
                    this.onMouseClickOnScale.bind(this)
                )
        }
        this._ruler.$instance
            .on('click.slider__ruler', this.onMouseClickOnSlider.bind(this));
    }

    private onMouseClickOnScale(event: JQuery.MouseUpEvent): void {
        const {state} = event.data;
        event.stopPropagation();
        this.moveSomePoint(state);
    }

    private moveSomePoint(to: number): void {
        Array.from(this._points)
            .reduce(
                (previousValue, currentValue) =>
                    (Math.abs(previousValue.state - to) <= Math.abs(currentValue.state - to))
                        ? previousValue
                        : currentValue
            )
            .moveTo(to);
    }

    private onMouseClickOnSlider(event: JQuery.MouseEventBase): void {
        let newPoint = this.percentsInPoint(event);
        newPoint = this.round(newPoint);
        this.moveSomePoint(newPoint);
    }

    private onMouseDownOnPoint(event: JQuery.MouseDownEvent): void {
        let {$context} = event.data;
        let $document = $(document);
        $document.one('mousedown.slider__point', SliderView.deselectText.bind(this));
        $document.one(
            'mouseup.slider__point',
            {$context: $document},
            SliderView.onMouseUpOnDocument
        );
        $document.on(
            'mousemove.slider__point',
            {$context},
            this.onMouseMovePoint.bind(this)
        )
    }

    private onMouseMovePoint(event: JQuery.MouseMoveEvent): void {
        let {$context} = event.data;
        let point = this.round(this.percentsInPoint(event))
        $context.moveTo(point);
    }

    private static onMouseUpOnDocument(event: JQuery.MouseUpEvent): void {
        let {$context} = event.data;
        $context.off('mousemove.slider__point');
    }

    private static deselectText(): false {
        return false;
    }
}
