import Point from "./Point";

type returnEmptyObject = {};
type returnValue = {
    from: number,
    to: number,
    points: number[]
}

export class Slider {
    private _points: Point[] | undefined;

    private pointInRange(value: number): boolean {
        if (value >= this._from && value <= this._to) return true;
        throw new Error(`Point value ${value} out of range: less ${this._from} or more ${this._to}`);
    }

    constructor(private _from: number, private _to: number, private _step: number = 1) {
    }

    points(points: [number]): Slider;
    points(points: [number, number]): Slider;
    points(points: any[]): Slider {
        points = (points[0] === points[1]) ? [points[0]] : points;
        try {
            this._points = points
                .filter(
                    item => this.pointInRange(item)
                )
                .map(
                    item => new Point(item)
                )
        } catch (e) {
            throw new Error(e.message);
        }
        return this;
    }

    values(): returnValue | returnEmptyObject {
        if (typeof this._points === 'undefined') return {};
        return {
            from: this._from,
            to: this._to,
            points: this._points
                .sort((a, b) => a.value - b.value)
                .map(
                    item => item.value
                )
        }
    }

    move(to: number): Slider {
        try {
            this.pointInRange(to);
        } catch (e) {
            return this;
        }
        if (typeof this._points === "undefined") this._points = [new Point(to)];
        this._points
            .reduce(
                (prevValue, curValue) => {
                    return (Math.abs(prevValue.value - to) < Math.abs(curValue.value - to)) ? prevValue : curValue;
                }
            )
            .value = to;
        return this;
    }

    private from(currentValue: number, to: number): Slider {
        if (typeof this._points === 'undefined') return this;
        try {
            this.pointInRange(currentValue + to)
        } catch (e) {
            return this;
        }
        this._points
            .reverse()
            .map(item => {
                if (item.value === currentValue) {
                    item.value += to;
                }
            })
        return this;
    }

    nextPoint(currentValue: number): Slider {
        return this.from(currentValue, this._step);
    }

    prevPoint(currentValue: number): Slider {
        return this.from(currentValue, -this._step);
    }
}