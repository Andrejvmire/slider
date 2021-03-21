import {pointInPercents} from "./pointInPercents";
import $ from 'jquery';

export default class RangerView implements IViewSubscriber, IView {
    private className: string[] = ['slider', 'slider__ranger'];
    private readonly $_instance: JQuery;
    private readonly _ruler: RulerType;
    private _state: number[];
    private readonly _side: SideType;
    private readonly _size: 'width' | 'height';
    private readonly _ranger: true | "revert";

    constructor(points: PointsType, ruler: RulerType, side: SideType = "left", ranger: boolean | "revert" = false) {
        if (!ranger) return;
        this._ranger = ranger;
        this._ruler = ruler;
        this._side = side;
        this._size = (this._side === 'left') ? 'width' : 'height';
        this.$_instance = $(document.createElement("div"))
            .addClass(this.className);
        this.update(points);
    }

    update(values: PointsType): void {
        let resultPoint: number[] = [];
        const addValue = (value: number): number[] => {
            let result: number[] = [];
            result.push(value);
            if (this._ranger === "revert") {
                result.push(this._ruler[1])
            } else {
                result.unshift(this._ruler[0]);
            }
            return result;
        }
        if (typeof values === "number") {
            resultPoint = addValue(values);
        } else if (values.length === 1) {
            resultPoint = addValue(...values);
        } else {
            resultPoint = values;
        }
        resultPoint = <[number, number]>resultPoint.sort((a, b) => a - b)
            .map(
                value => pointInPercents(value, this._ruler)
            );
        this.$_instance
            .css({
                [this._side]: `${resultPoint[0]}%`,
                [this._size]: `${resultPoint[1] - resultPoint[0]}%`
            });
        this._state = resultPoint;
    }

    get $instance(): JQuery {
        return this.$_instance;
    }

    get state(): number[] {
        return this._state;
    }

}