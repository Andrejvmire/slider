export default class Point {
    private readonly _callback: ((oldState: number, newState: number) => boolean) | undefined;

    constructor(private _value: number, callback?: (oldState: number, newState: number) => boolean) {
        this._callback = callback;
    }

    next(): number {
        return this._value += 1;
    }

    prev(): number {
        return this._value -= 1;
    }

    value(): number {
        return this._value;
    }

    moveTo(position: number): Point {
        if (typeof this._callback !== "undefined") {
            this._value = this._callback(this._value, position) ? position : this._value;
        }
        return this;
    }
}