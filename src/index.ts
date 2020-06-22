import Slider from "./ts/controllers/Slider";

const $App = $("#app"),
    slider = new Slider({
        ruler: [2366, 28765],
        points: [3560, 10300],
        tooltip: true,
        // orientation: "vertical"
    }, $App);

const $slider = $('#slider_2'),
    slider2 = new Slider({
        ruler: [2755, 12667],
        points: [5543],
        orientation: "vertical",
        tooltip: true
    }, $slider);