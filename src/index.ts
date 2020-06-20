import Slider from "./ts/controllers/Slider";

const $App = $("#app"),
    slider = new Slider({ruler: [20, 400], points: [130, 223], tooltip: true}, $App);