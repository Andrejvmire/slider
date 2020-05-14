import Point from "./Point";

export class Slider {
    private readonly _points: Point[];

    private checkPointValue(point: number): boolean;
    private checkPointValue(point: number[]): boolean;
    private checkPointValue(point: any): any {
        if (typeof point === "number") {
            return (this._from < point) && (point < this._to);
        } else if (typeof point === "object") {
            return (this._from < point[0]) && (point[0] < point[1]) && (point[1] < this._to);
        }
    }

    constructor(private _from: number, private _to: number, points: number[]) {
        if (!this.checkPointValue(points)) throw new Error("'Points' out of range");
        let start = _from;
        points.map(
            item => {
                return new Point(item)
            }
        )
    };

    from(): number {
        return this._from;
    };

    to(): number {
        return this._to;
    };

    points(): Point[] {
        return this._points;
    }

    values(): number[] {
        return this._points
            .map(
                item => item.value()
            );
    }

}