import AbstractPublisher from "./AbstractPublisher";

export default class PointModel extends AbstractPublisher implements IPublisher {

    constructor(private _point: number) {
        super();
    }

    get value(): PointResponseType {
        return {
            point: this._point
        };
    }

    set value(point: PointResponseType) {
        this._point = point.point;
    }
}