import PointView from "../../src/ts/views/PointView";
import $ from 'jquery';

describe("Тестируем PointView", () => {
    describe("Обработка корректных данных", () => {
        let point: IViewPublisher;
        beforeAll(() => {
            point = new PointView(40, "left");
        })
        it('Вернет не null', () => {
            expect(point.state)
                .not.toBeNull();
        });
        it('Вернет объект JQuery', () => {
            expect(point.$instance)
                .toBeInstanceOf($)
        });
        it('вернет объект с позицией 40%', function () {
            expect(point.$instance.attr('style'))
                .toEqual("left: 40%;")
        });
        it('содержит классы slider slider__point', function () {
            expect(point.$instance.hasClass('slider slider__point'))
                .toBeTruthy()
        });
    })
})