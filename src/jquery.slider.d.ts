interface JQuery {
    simpleSlider(): JQuery;

    simpleSlider(options: MainOptionsType): JQuery;

    simpleSlider(method: "value", callback: Function): JQuery;

    simpleSlider(method: "update", options: PointsType): JQuery;
}