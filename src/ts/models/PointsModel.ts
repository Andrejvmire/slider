import PointModel from "./PointModel";
import AbstractModelPublisher from "../abstract/AbstractModelPublisher";

export default class PointsModel extends AbstractModelPublisher implements ISubscriber, IPoints {
    private _points: IPoint[] = [];
    private _step: number;

    get state(): number[] {
        return this._points
            .map(
                point => point.state
            )
            .sort((a, b) => a - b);
    };

    constructor(points: [number, number] | [number] | number, step: number = 1) {
        super();
        if (step <= 0) throw new Error("The step must be greater than 0");
        this._step = step;
        if (typeof points === "number") {
            this._points.push(new PointModel(this.setStep(points), this))
        } else {
            this._points = points.map(
                point => new PointModel(this.setStep(point), this)
            );
        }
    };

    private setStep(value: number): number {
        return value - (value % this._step);
    }

    move(to: number, from?: number): PointsModel {
        to = this.setStep(to);
        if (typeof from === "undefined") {
            this._points
                .reduce(
                    (previousValue, currentValue) => {
                        const absCurrVal = Math.abs(currentValue.state - to),
                            absPrevValue = Math.abs(previousValue.state - to);
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