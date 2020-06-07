import RulerView from "./RulerView";
import PointsView from "./PointsView";
import ScaleView from "./ScaleView";
import AbstractPublisher from "../models/AbstractPublisher";

export default class SliderView extends AbstractPublisher implements IViewSubscriber, IViewInstance, IViewPublisher {
    private _$instance: JQuery;
    private _points: (IViewPublisher & IViewInstance);
    private _ruler: (IViewPublisher & IViewInstance);
    private _scale: IViewInstance;

    constructor(options: ViewOptionsType) {
        super();
        this._ruler = new RulerView(options.ruler);
        this._ruler.attach(this);
        this._points = new PointsView(options.points);
        this._points.attach(this);
        this._scale = new ScaleView(options.scale);
    }

    update(data: ViewResponseType): void {
    }

    render(parent: JQuery): void {
        this._ruler.render(parent);
        this._scale.render(parent);
        this._points.render(parent);
    }

    get value(): JQuery {
        return this._$instance;
    }
}