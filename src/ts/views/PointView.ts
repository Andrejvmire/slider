import _ from "lodash";
import AbstractPublisher from "../models/AbstractPublisher";

require("../../../node_modules/jquery-ui/ui/widgets/draggable.js");

export default class PointView extends AbstractPublisher implements IViewPublisher, IViewInstance {
    private readonly _$instance: JQuery;
    private _axis: 'x' | 'y';
    private _className: string[] = ['slider', 'slider__point', 'js-slider-point'];
    private _position: PositionType;

    constructor(options: PointViewOptionsType) {
        super();
        let {position, className} = options;
        this._axis = (position.hasOwnProperty("left")) ? 'x' : 'y';
        this._className = _.concat(this._className, className);
        this._$instance = $(document.createElement('span'))
            .addClass(this._className);
        this.moveTo(position);
        this.addHandlers();
    }

    private addHandlers(): void {
        this._$instance
            .draggable({
                axis: this._axis,
                containment: 'parent',
                start: (event, ui) => this.start(ui),
                stop: (event, ui) => this.stop(ui)
            })
    }

    private start(data: JQueryUI.DraggableEventUIParams): void {
        this._$instance
            .addClass("slider__point_selected");
        console.log(data);
    }

    private stop(data: JQueryUI.DraggableEventUIParams): void {
        this._$instance
            .removeClass("slider__point_selected");
        console.log(data);
        this.notify({
            from: this._position,
            to: this._position
        })
    }

    moveTo(point: PositionType): PointView {
        const {left, top} = Object.assign({left: 0, top: 0}, point);
        if (point.hasOwnProperty("left")) {
            this._$instance
                .css("left", left + "%")
        } else {
            this._$instance
                .css("top", top + "%");
        }
        this._position = point;
        return this;
    }

    get value(): JQuery {
        return this._$instance;
    }

    render(parent: JQuery): void {
        parent.append(this._$instance);
    }
};