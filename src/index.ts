import JQuery from 'jquery';
import Slider from "./ts/controllers/Slider";

(function ($) {
    let methods = {
        init: (options: MainOptionsType) => {
            console.log(options, this);
            return new Slider(options, $(this));
        },
        update: (value: PointsType) => {

        },
        value: (): PointsType => {
            return [5, 6];
        }
    };
    $.fn.simpleSlider = function (method?: MethodNameType, options?: MainOptionsType): JQuery {
        let settings: MainOptionsType = {
            ruler: [2, 100],
            points: 50,
            step: 1,
            orientation: "horizontal",
            ranger: false,
            tooltip: false,
        };
        return this.each(function () {
            if (typeof method !== "undefined" && methods[method]) {
                return methods[method].apply(this, Array.prototype.slice.call(arguments, 1))
            } else if (typeof method === "object" || typeof method === "undefined") {
                return methods.init.apply(this, settings);
            } else {
                $.error(`Method ${method} is not defined for "simpleSlider"`);
            }
        });
    }
})(JQuery)

$("#app").simpleSlider("init");