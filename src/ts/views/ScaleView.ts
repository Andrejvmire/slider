import _ from "lodash";
import jqXHR = JQuery.jqXHR;

export default class ScaleView implements IViewSubscriber, IViewInstance {
    private _$instance: JQuery;
    private _className: string[] = ['slider', 'slider__scale']

    constructor(options: ScaleViewOptionsType) {
        this._className = _.concat(this._className, options.className || '');
        this._$instance = $(document.createElement('div'))
            .addClass(this._className)
    }

    update(data: ViewResponseType): void {

    }

    render(parent: JQuery): void {
        parent.append(
            this._$instance
        )
    }

}