import PointView from "./PointView";
import AbstractViewPublisher from "../abstract/AbstractViewPublisher";

export default class PointsView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber {
    private readonly _points: (IViewPublisher & IPoint)[] = [];
    private _state: number[];

    constructor(points: PointsType, side: "left" | "top", private _ruler: [number, number]) {
        super();
        if (typeof points === "number") {
            points = [points];
        }
        this._points = points.map(
            point => {
                let newPoint = new PointView(point, side, _ruler);
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
        let [from, to] = this._ruler;
        this._state = this._points.map(
            point => Math.floor(point.state * (to - from) / 100) + from
        )
        this.notify();
    }

    get state(): number | number[] {
        return this._state;
    }
}