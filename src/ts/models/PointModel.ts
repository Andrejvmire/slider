import AbstractModelPublisher from "../abstract/AbstractModelPublisher";

export default class PointModel extends AbstractModelPublisher implements IPoint, IModelPublisher {
    constructor(private _position: number) {
        super();
    }

    moveTo(newPosition: number): void {
        this._position = newPosition;
    }

    get state(): number {
        return this._position;
    }
}