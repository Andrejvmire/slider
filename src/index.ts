import JQuery from 'jquery';
import Slider from "./ts/controllers/Slider";

(function ($) {
    const DATA_FIELD = 'simpleSlider',
        DEFAULT_SLIDER: TSliderOptions = {
            min: 0,
            max: 100,
            to: 50,
            from: 0,
            step: 1,
            vertical: false,
            tooltip: false,
        };

    const methods = {
        init: function (opts: TSliderOptions): JQuery {
            return this.each(function () {
                const $this = $(this);
                const data = $this.data(DATA_FIELD);
                if (data) return $this;
                const slider = new Slider(opts, $this);
                $this.data(DATA_FIELD, {
                    slider
                });
                return $this;
            })
        },
        update: function (value: TPoints): JQuery {
            return this.each(function () {
                const $this = $(this);
                const data = $this.data(DATA_FIELD);
                if (!data) return $this;
                data.slider.update(value);
                return $this;
            })
        },
        value: function (callback: CallableFunction): JQuery {
            return this.each(function () {
                const $this = $(this);
                const data = $this.data(DATA_FIELD);
                if (!data) return $this;
                const subscriber: ISubscriber = {
                    update(data?: TPublisher) {
                        callback(data);
                    }
                }
                data.slider.attach(subscriber);
                return $this;
            })
        }
    }

    function simpleSlider(): JQuery;
    function simpleSlider(options: TSliderOptions): JQuery;
    function simpleSlider(method: "value", callback: CallableFunction): JQuery;
    function simpleSlider(method: "update", options: TPoints): JQuery;
    function simpleSlider(method?: TSliderOptions | "value" | "update", options?: CallableFunction | TPoints): JQuery {
        const settings = (opt?: TSliderOptions): TSliderOptions => Object.assign(
            {},
            DEFAULT_SLIDER,
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
