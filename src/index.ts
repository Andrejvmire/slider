import JQuery from 'jquery';
import Slider from "./ts/controllers/Slider";

(function ($) {
    const DATA_FIELD = 'simpleSlider';
    const methods = {
        init: function (opts: MainOptionsType): JQuery {
            return this.each(() => {
                let data = $(this).data(DATA_FIELD);
                if (data) return this;
                this.slider = new Slider(opts, this);
                $(this).data(DATA_FIELD, {
                    slider: this
                })
                return this;
            })
        },
        update: function (value: PointsType): JQuery {
            return this.each(() => {
                let data = $(this).data(DATA_FIELD);
                if (!data) return this;
                this.slider.update(value);
                return this;
            })
        },
        value: function (callback: Function): JQuery {
            return this.each(() => {
                let data = $(this).data(DATA_FIELD);
                if (!data) return this;
                let subscriber: ISubscriber = {
                    update(data?: any) {
                        callback(data);
                    }
                }
                this.slider.attach(subscriber);
                return this;
            })
        }
    }

    function simpleSlider(): JQuery;
    function simpleSlider(options: MainOptionsType): JQuery;
    function simpleSlider(method: "value", callback: Function): JQuery;
    function simpleSlider(method: "update", options: PointsType): JQuery;
    function simpleSlider(method?: any, options?: any): any {
        let settings = (opt?: MainOptionsType): MainOptionsType => Object.assign(
            {},
            {
                ruler: [0, 100],
                points: 50,
                step: 1,
                orientation: "horizontal",
                ranger: false,
                tooltip: false,
            },
            opt
        );
        if (typeof method === "undefined") {
            return methods.init.call(this, settings());
        } else if (typeof method === "object") {
            return methods.init.call(this, settings(method))
        } else if (method === "update") {
            return methods.update.call(this, options);
        } else if (method === "value") {
            return methods.value.call(this, options);
        }
        return $.error(`Метод ${method} не определен`);
    }

    $.fn.simpleSlider = simpleSlider;
})(JQuery)
