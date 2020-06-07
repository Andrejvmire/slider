export default class PointsView {
    private _point: IPublisher[];

    render(parent: JQuery): void {
        this._points
            .map(
                point => point.render(parent)
            )
    }

    }
}