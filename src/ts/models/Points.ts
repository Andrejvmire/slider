import Point from "./Point";

export default class Points {
    private readonly _items: Point[];

    constructor(items: string[]);
    constructor(items: number[]);
    constructor(items: any[]) {
        this._items = items
            .map( item => {
                return new Point(item);
            });
    }

    values(): number[] {
        return this._items
            .map(item => {
                return item.value()
            })
    }
}