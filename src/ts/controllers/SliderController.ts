import SliderModel from "../models/SliderModel";
import SliderView from "../views/SliderView";

export default class SliderController implements ISubscriber {
    private _model: IModelPublisher;
    private _view: (IViewPublisher & IViewInstance);

    constructor(options: any) {
        this._model = new SliderModel({
            ruler: [45, 789],
            points: [67, 450]
        });
        this._view = new SliderView({
            points: {
                className: '',
                position: [
                    {left: 67},
                    {left: 450}
                ]
            },
            ruler: {
                className: '',
                min: 45,
                max: 789
            },
            scale: {
                className: ''
            }
        });
        this._model.attach(this);
        this._view.attach(this);
        this._view.render($("#slider"));
    }

    update(data: any): void {
    }
}