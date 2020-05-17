export default class Point {

    constructor(private _point: number) {
    }

    get value(): number {
        return this._point;
    }

    set value(newValue: number) {
        this._point = newValue;
    }
}