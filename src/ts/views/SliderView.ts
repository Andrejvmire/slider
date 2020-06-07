export default class SliderView {
    private _points: ISubscriber;
    private _ruler: IPublisher;

    render(parent: JQuery): void {
        this._ruler.render(parent);
        this._scale.render(parent);
        this._points.render(parent);
    }

}