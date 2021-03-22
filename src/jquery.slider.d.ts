interface JQuery {
    simpleSlider(): JQuery;

    simpleSlider(options: TSliderOptions): JQuery;

    simpleSlider(method: "value", callback: Function): JQuery;

    simpleSlider(method: "update", options: TSliderOptions): JQuery;
}