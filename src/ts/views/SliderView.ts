import AbstractViewPublisher from "../abstract/AbstractViewPublisher";

type OptionsType = {
    points: [number] | [number, number],
    ruler: [number, number]
};

export default class SliderView extends AbstractViewPublisher implements IViewPublisher, ISubscriber {
    private $_points: JQuery[] = [];
    private $_tooltips: JQuery[] = [];
    private $_ranger: JQuery;
    private $_container: JQuery;

    constructor(options: OptionsType = {points: [60, 335], ruler: [20, 400]}, parent: JQuery) {
        super();
        let $tooltipLine = $(document.createElement("div"));
        this.$_container = parent;
        this.$_container
            .addClass("slider slider__container");
        (this.$_instance = $(document.createElement("div")))
            .addClass('slider slider__ruler');
        options.points
            .map(
                point => {
                    const pointInPercents = (point: number, per: [number, number]): string => {
                        return `${(point - per[0]) / (per.reduce((p, c) => c - p)) * 100}%`;
                    }
                    let $point = $(document.createElement("span"))
                            .addClass("slider slider__point"),
                        $tooltip = $(document.createElement("span"))
                            .addClass("slider slider__tooltip")
                            .html(String(point)),
                        offset = {"left": pointInPercents(point, options.ruler)};
                    this.$_tooltips.push($tooltip);
                    $tooltip.appendTo($point);
                    this.$_points.push($point);
                    $point.appendTo(this.$_instance);
                    $point.css(offset);
                    $point.on('mousedown.slider__point', mouseDownEvent => {
                        $(document).one('mousedown.slider__point', () => false);
                        $(document).one('mouseup.slider__point', mouseUpEvent => {
                            $(document).off('mousemove.slider__point');
                        });
                        $(document).on("mousemove.slider__point", mouseMoveEvent => {
                            let offset = this.$_container.offset()?.left || 0,
                                relativeX = (mouseMoveEvent.pageX || 0) - offset,
                                width = this.$_container.width() || 1,
                                percent = (relativeX * 100) / width;
                            if ((percent > 0) && (percent < 100)) {
                                $point.css({
                                    left: percent + "%"
                                })
                            }
                        })
                    })
                }
            )
        if (typeof options.points[1] !== "undefined") {
            this.$_ranger = $(document.createElement("div"))
                .addClass("slider slider__ranger")
                .css({
                    "left": `${(options.points[0] - options.ruler[0]) / (options.ruler.reduce((p, c) => c - p)) * 100}%`,
                    "right": `${100 - (options.points[1] - options.ruler[0]) / (options.ruler.reduce((p, c) => c - p)) * 100}%`
                })
                .appendTo(this.$_instance);
        }
        $tooltipLine.appendTo(this.$_instance);
        this.$_instance.appendTo(parent);
    }

    update(data?: any): void {
    }
}