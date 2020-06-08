import PointView from "./PointView";
import AbstractPublisher from "../models/AbstractPublisher";

export default class PointsView extends AbstractPublisher implements IViewSubscriber, IViewInstance, IViewPublisher {
    private _points: (IViewPublisher & IViewInstance)[];
    private _$instance: JQuery;

    constructor(options: PointsViewOptionsType) {
        super();
        this._points = options.position
            .map(
                item => new PointView({className: options.className, position: item})
            )
        this.subscribe();
    }

    private subscribe(): void {
        this._points.map(
            item => item.attach(this)
        )
    }

    render(parent: JQuery): void {
        this._points
            .map(
                point => point.render(parent)
            )
    }

    update(data: ViewResponseType): void {
        console.log(data);
        this.notify(data);
    }

    get value(): JQuery {
        return this._$instance;
    };
}