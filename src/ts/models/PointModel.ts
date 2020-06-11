import AbstractModelPublisher from "../abstract/AbstractModelPublisher";

export default class PointModel extends AbstractModelPublisher implements IPoint, IModelPublisher {
    constructor(private _position: number, subscriber?: ISubscriber) {
        super();
        if (typeof subscriber !== "undefined") {
            this.attach(subscriber);
        }
    }

    moveTo(newPosition: number): void {
        this._position = newPosition;
        this.notify();
    }

    get state(): number {
        return this._position;
    }
}