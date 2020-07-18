import {pointInPercents} from "./pointInPercents";
import $ from "jquery";

export default class ScaleView implements IIterable<JQuery> {
    private readonly $_pointsInstance: JQuery[] = [];
    private className: string[] = ['slider', 'slider__scale'];

    constructor(points: number[], ruler: RulerType, side: SideType, orientation: SliderOrientationType = "vertical") {
        this.addClassName(orientation);
        this.$_pointsInstance = points
            .filter(
                point => ((point >= ruler[0]) && (point <= ruler[1]))
            )
            .map(
                point => $(document.createElement("span"))
                    .addClass(this.className)
                    .css(side, `${pointInPercents(point, ruler)}%`)
                    .attr("data-scale-value", point)
            )
    }

    private addClassName(orientation: SliderOrientationType): void {
        this.className.push(
            `slider__scale_${orientation}`
        )
    }

    * [Symbol.iterator](): Generator<JQuery> {
        for (let point of this.$_pointsInstance) {
            yield point;
        }
    }
}