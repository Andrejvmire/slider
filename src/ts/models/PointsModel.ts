import PointModel from "./PointModel";
import AbstractPublisher from "./AbstractPublisher";

export default class PointsModel extends AbstractPublisher implements IPublisher, IPointsEvents, ISubscriber {
    private _points: PointModel[];

    constructor(points: PointsType) {
        super();
        if (typeof points === 'number') {
            this._points = [new PointModel(points)]
        } else {
            this._points = points.map(
                point => new PointModel(point)
            )
        }
        this._points.map(
            point => point.attach(this)
        )
    }

    get value(): PointsResponseType {
        return {
            points: this._points
                .map(point => {
                    return point.value.point
                })
                .sort((a, b) => a - b)
        }
    }

    move(newValue: number): PointsModel {
        this._points
            .reduce(
                (prevValue, curValue) => {
                    return (Math.abs(prevValue.value.point - newValue) < Math.abs(curValue.value.point - newValue)) ? prevValue : curValue;
                }
            )
            .value = {point: newValue};
        return this;
    }

    moveTo(curValue: number, nextValue: number): PointsModel {
        this._points
            .map(
                item => {
                    if (item.value.point === curValue) {
                        item.value = {point: nextValue};
                    }
                }
            )
        return this;
    }

    update(data: ModelResponseType): void {
        this.notify();
    }
}