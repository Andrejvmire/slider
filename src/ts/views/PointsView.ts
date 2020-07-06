import PointView from "./PointView";
import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import {pointInPercents} from "./pointInPercents";
import TooltipView from "./TooltipView";

export default class PointsView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber, IPoints, IIterable<IViewPublisher & IPoint> {
    private readonly _points: (IViewPublisher & IPoint)[] = [];
    private _state: number[];

    constructor(points: PointsType, side: SideType, private _ruler: RulerType, tooltip: boolean = true, orientation: SliderOrientationType = "horizontal") {
        super();
        if (typeof points === "number") {
            points = [points];
        }
        this._state = points;
        this._points = this._state.map(
            point => {
                const newPoint = new PointView(point, side, this._ruler, orientation);
                if (tooltip) {
                    const newTooltip = new TooltipView(point, orientation);
                    newPoint.attach(newTooltip);
                    newPoint.$instance
                        .append(
                            newTooltip.$instance
                        )
                }
                newPoint.attach(this);
                return newPoint;
            }
        )
    }

    *[Symbol.iterator](): Generator<IViewPublisher & IPoint> {
        for (let point of this._points) {
            yield point;
        }
    }

    update(): void {
        this._state = this._points.map(
            point => point.state
        )
        this.notify();
    }

    get state(): number[] {
        return this._state
            .sort((a, b) => a - b);
    }

    move(to: number, from: number): IPoints {
        this._points
            .map(
                point => {
                    const {state} = point;
                    if (state === from) {
                        point.moveTo(to);
                    }
                }
            )
        return this;
    }

}
