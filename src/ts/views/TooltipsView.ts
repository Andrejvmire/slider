import TooltipView from "./TooltipView";

export default class TooltipsView implements IViewSubscriber, IIterable<IViewSubscriber & IView> {
    private _tooltip: (IViewSubscriber & IView)[] = [];

    constructor(points: PointsType, _orientation: 'horizontal' | 'vertical') {
        if (typeof points === "number") {
            points = [points];
        }
        this._tooltip = points.map(
            point => new TooltipView(point, _orientation)
        )
    }

    *[Symbol.iterator](): Generator<(IViewSubscriber & IView)> {
        for (let tooltip of this._tooltip) {
            yield tooltip;
        }
    }

    update(values: number[]): void {
        values
            .sort((a, b) => a - b)
            .map(
                (value, index) => this._tooltip[index].update(value)
            )
    }
}