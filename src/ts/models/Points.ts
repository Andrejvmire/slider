import Point from "./Point";

export default class Points {
    private _points: Point[];

    constructor(points: number | [number] | [number, number]) {
        if (Array.isArray(points)) {
            points = (points[0] === points[1]) ? [points[0]] : points;
            this._points = points
                .map(
                    (item: number) => new Point(item)
                )
        }
        if (typeof points === 'number') {
            this._points = [new Point(points)];
        }
    }

    private from(curValue: number, to: number): Points {
        this._points
            .map(
                item => {
                    if (item.value === curValue) {
                        item.value = to;
                    }
                }
            )
        return this;
    }

    values(): number[] {
        return this._points
            .sort((a, b) => a.value - b.value)
            .map(
                item => item.value
            )
    }

    move(to: number): Points {
        this._points
            .reduce(
                (prevValue, curValue) => {
                    return (Math.abs(prevValue.value - to) < Math.abs(curValue.value - to)) ? prevValue : curValue;
                }
            )
            .value = to;
        return this;
    }

    nextPoint(curValue: number, step: number = 1): Points {
        return this.from(curValue, curValue + step);
    }

    prevPoint(curValue: number, step: number = 1): Points {
        return this.from(curValue, curValue - step);
    }
}