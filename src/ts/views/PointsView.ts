import PointView from "./PointView";
import AbstractViewPublisher from "../abstract/AbstractViewPublisher";
import {pointInPercents} from "./pointInPercents";

export default class PointsView extends AbstractViewPublisher implements IViewPublisher, IViewSubscriber, IPoints, IIterable<IViewPublisher & IPoint> {
    private readonly _points: (IViewPublisher & IPoint)[] = [];
    private _state: number[];

    constructor(points: PointsType, side: "left" | "top", private _ruler: [number, number]) {
        super();
        if (typeof points === "number") {
            points = [points];
        }
        this._state = points;
        this._points = this._state.map(
            point => {
                let newPoint = new PointView(pointInPercents(point, this._ruler), side);
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
            point => this.round(point.state)
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
                    let state = this.round(point.state);
                    if (state === from) {
                        point.moveTo(pointInPercents(to, this._ruler));
                    }
                }
            )
        return this;
    }

    private round(point: number): number {
        let [min, max] = this._ruler;
        return Math.round(point * (max - min) / 100) + min
    }
}