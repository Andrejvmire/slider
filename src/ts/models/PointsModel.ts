import PointModel from "./PointModel";
import AbstractModelPublisher from "../abstract/AbstractModelPublisher";

export default class PointsModel extends AbstractModelPublisher implements ISubscriber, IPoints {
    private _points: IPoint[];
    private _step: number;

    get state(): number[] {
        return this._points
            .map(
                point => point.state
            );
    };

    constructor(points: [number, number] | [number] | number, step: number = 1) {
        super();
        this.setStep(step);
        if (typeof points === "number") {
            this._points.push(new PointModel(points, this))
        } else {
            this._points = points.map(
                point => new PointModel(point, this)
            );
        }
    };

    private setStep(step: number): void {
        if (step <= 0) throw new Error("The step must be greater than 0");
        this._step = step;
    }

    move(to: number, from?: number): PointsModel {
        if (typeof from === "undefined") {
            this._points
                .reduce(
                    (previousValue, currentValue) => {
                        return (previousValue.state <= currentValue.state) ? previousValue : currentValue;
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