import PointView from "../../src/ts/views/PointView";
import $ from 'jquery';
import {pointInPercents} from "../../src/ts/views/pointInPercents";

describe("Тестируем PointView", () => {
    describe("Обработка корректных данных", () => {
        let point: IViewPublisher;
        beforeAll(() => {
            point = new PointView(pointInPercents(40, [0,100]), "left");
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