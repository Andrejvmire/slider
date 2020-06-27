import PointModel from "./PointModel";
import AbstractModelPublisher from "../abstract/AbstractModelPublisher";

export default class PointsModel extends AbstractModelPublisher implements ISubscriber, IPoints {
    private _points: IPoint[] = [];

    get state(): number[] {
        return this._points
            .map(
                point => point.state
            )
            .sort((a, b) => a - b);
    };

    constructor(points: PointsType) {
        super();
        if (typeof points === "number") {
            this._points.push(new PointModel(points, this))
        } else {
            this._points = points.map(
                point => new PointModel(point, this)
            );
        }
    };

    move(to: number, from?: number): PointsModel {
        if (typeof from === "undefined") {
            this._points
                .reduce(
                    (previousValue, currentValue) => {
                        const absCurrVal = Math.abs(currentValue.state - to);
                        const absPrevValue = Math.abs(previousValue.state - to);
                        return (absPrevValue <= absCurrVal) ? previousValue : currentValue;
                    }
                )
                .moveTo(to);
        } else {
            this._points
                .map(
                    point => {
                        if (point.state === from) {
                            point.moveTo(to);
                        }
                    }
                )
        }
        return this;
    }

    update(data: any): void {
        this.notify();
    }

}