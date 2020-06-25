import Slider from "./ts/controllers/Slider";

const $App = $("#app");
const slider = new Slider({
        ruler: [2366, 28765],
        points: [3561, 10322],
        tooltip: true,
        // orientation: "vertical",
        step: 100
    }, $App);