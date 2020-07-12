import JQuery from 'jquery';
import Slider from "./ts/controllers/Slider";

(function ($) {
    const methods = {
        init: function (opts: MainOptionsType): JQuery {
            return this.each(() => {
                this.slider = new Slider(opts, this);
                return this;
            })
        },
        update: function (value: PointsType): JQuery {
            console.log(value);
            return this.each(() => {
                this.slider.update(value);
            })
        },
        value: function (callback: Function): PointsType {
            return this.each(() => {
                this.slider.subscribe(callback);
                return this;
            })
        }
    }

    function simpleSlider(): JQuery;
    function simpleSlider(options: MainOptionsType): JQuery;
    function simpleSlider(method: "value", callback: Function): JQuery;
    function simpleSlider(method: "update", options: PointsType): JQuery;
    function simpleSlider(method?: any, options?: any, callback?: Function): any {
        let settings = (opt?: MainOptionsType): MainOptionsType => Object.assign(
            {},
            {
                ruler: [2, 100],
                points: 50,
                step: 1,
                orientation: "horizontal",
                ranger: false,
                tooltip: false,
            },
            opt
        );
        console.log(method, options);
        if (typeof method === "undefined") {
            return methods.init.call(this, settings());
        } else if (typeof method === "object") {
            return methods.init.call(this, settings(method))
        } else if (method === "update") {
            return methods.update.call(this, options);
        }
        // if (typeof method === "undefined") {
        //     return methods.init.call(this, settings(options));
        // } else if (method === "update") {
        //     return methods.update.call(this, options);
        // } else if (method === "value") {
        //     return methods.value.call(this, options);
        // }
    }

    $.fn.simpleSlider = simpleSlider;
})(JQuery)

let app = $("#app").simpleSlider();
let slider = $("#slider_2").simpleSlider({
    points: [55, 80],
    ruler: [-55, 230],
    orientation: "vertical",
    tooltip: true,
});

app.simpleSlider("update", [88])
// app.simpleSlider("value", console.log);
// slider.simpleSlider("value", console.log);