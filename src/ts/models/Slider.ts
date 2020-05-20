import Points from "./Points";
import Ruler from "./Ruler";
import Publisher from "./Publisher";

//модель не может отдавать пустой объект
// type returnEmptyObject = {};
type returnValue = {
    min: number,
    max: number,
    points: number[],
    step?: number
}

export type sliderConstructor = {
    from: number,
    to: number,
    step?: number,
    points: number | [number, number]
}

export default class Slider extends Publisher implements IPublisher {
    protected _subscribers: ISubscriber[];
    private readonly _points: Points;
    private readonly _ruler: Ruler;

    constructor(options: sliderConstructor) {
        let {from, to, step, points} = options;
        super();
        this._ruler = new Ruler(from, to, step);
        this._ruler.checkValue(points);
        this._points = new Points(points);
    }

    values(): returnValue { //| returnEmptyObject {
        // if (typeof this._points === 'undefined') return {};
        return {
            ...this._ruler.delimiters,
            points: this._points.values()
        }
    }

    move(to: number): Slider {
        // _points не может быть undefined
        // if (typeof this._points === 'undefined') return this;
        try {
            this._ruler.checkValue(to);
        } catch (e) {
            return this;
        }
        this._points
            .move(to)
        this.notify();
        return this;
    }

    nextPoint(currentValue: number): Slider {
        // _points не может быть undefined
        // if (typeof this._points === 'undefined') return this;
        let {step} = this._ruler;
        try {
            this._ruler.checkValue(currentValue + step);
            this._points.nextPoint(currentValue, step);
            this.notify();
        } catch (e) {
            this._points.nextPoint(currentValue, 0);
        }
        return this;
    }

    prevPoint(currentValue: number): Slider {
        // _points не может быть undefined
        // if (typeof this._points === 'undefined') return this;
        let {step} = this._ruler;
        try {
            this._ruler.checkValue(currentValue - step);
            this._points.prevPoint(currentValue, step);
            this.notify();
        } catch (e) {
            this._points.prevPoint(currentValue, 0);
        }
        return this;
    }
}