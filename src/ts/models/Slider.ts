import Points from "./Points";
import Ruler from "./Ruler";

type returnEmptyObject = {};
type returnValue = {
    min: number,
    max: number,
    points: number[]
}

export default class Slider {
    private _points: Points;
    private readonly _ruler: Ruler;

    constructor(from: number, to: number, step: number = 1) {
        this._ruler = new Ruler(from, to, step);
    }

    points(points: number | [number, number]): Slider {
        if (Array.isArray(points)) {
            this._ruler.checkValue(points);
            this._points = new Points(points);
        }
        return this;
    }

    values(): returnValue | returnEmptyObject {
        if (typeof this._points === 'undefined') return {};
        return {
            ...this._ruler.delimiters,
            points: this._points.values()
        }
    }

    move(to: number): Slider {
        if (typeof this._points === 'undefined') return this;
        try {
            this._ruler.checkValue(to);
        } catch (e) {
            return this;
        }
        this._points
            .move(to)
        return this;
    }

    nextPoint(currentValue: number): Slider {
        if (typeof this._points === 'undefined') return this;
        let {step} = this._ruler;
        try {
            this._ruler.checkValue(currentValue + step);
            this._points.nextPoint(currentValue, step);
        } catch (e) {
            this._points.nextPoint(currentValue, 0);
        }
        return this;
    }

    prevPoint(currentValue: number): Slider {
        if (typeof this._points === 'undefined') return this;
        let {step} = this._ruler;
        try {
            this._ruler.checkValue(currentValue - step);
            this._points.prevPoint(currentValue, step);
        } catch (e) {
            this._points.prevPoint(currentValue, 0);
        }
        return this;
    }
}