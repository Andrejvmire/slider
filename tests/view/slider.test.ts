import SliderView from "../../src/ts/views/SliderView";
import $ from 'jquery';

describe('Тестируем SliderView', function () {
    let parent = $(document.createElement('div'));
    let slider: IViewPublisher & IViewSubscriber & ISlider;
    describe('Создаем класс', function () {
        beforeEach(() => {
            slider = new SliderView({
                points: [34, 45],
                tooltip: true,
                orientation: "vertical",
                ruler: [0, 120],
            }, parent);
        });
        it('должен веруть объект не undefined', function () {
            expect(slider)
                .not.toBeUndefined();
        });
        it('должен вернуть $instance типа JQuery', function () {
            expect(slider.$instance)
                .toBeInstanceOf($);
        });
        it("должен соответствовать снимку", function () {
            expect(parent)
                .toMatchSnapshot();
        })
    });
    describe('Меняем состояние', function () {
        beforeEach(() => {
            slider = new SliderView({
                points: [-3, 77],
                ruler: [-23, 199],
                orientation: "vertical"
            }, parent)
        });
        it('Переместит точку', function () {
            expect(slider.move(-20, -3).state)
                .toStrictEqual([-20, 77]);
        });
    });
});